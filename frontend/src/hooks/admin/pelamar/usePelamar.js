import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    getPelamarById,
    getPelamarList,
    getPelamarPositionOptions,
    getPelamarStatusOptions,
    removePelamar,
    updatePelamarStatus,
} from "../../../services/admin/pelamar/repository/pelamar.repository";

const ACTIVE_STATUSES = ["submitted", "screening", "interview"];
const URGENT_DEADLINE_LEVELS = ["warning", "danger"];

function includesText(source, keyword) {
    return String(source || "")
        .toLowerCase()
        .includes(String(keyword || "").toLowerCase());
}

function isValidStatus(value, options = []) {
    return options.some((option) => option.value === value);
}

function getStatusFromParams(searchParams, statusOptions) {
    const queryPriority = searchParams.get("priority");
    const queryStatus = searchParams.get("status");

    if (queryPriority === "urgent") {
        return "process";
    }

    if (queryStatus && isValidStatus(queryStatus, statusOptions)) {
        return queryStatus;
    }

    return "process";
}

function getPriorityFromParams(searchParams) {
    const queryPriority = searchParams.get("priority");

    return queryPriority === "urgent" ? "urgent" : "";
}

function getApplicantRecordId(applicants = [], identifier) {
    const found = applicants.find((item) => {
        return (
            String(item.id) === String(identifier) ||
            String(item.lamaranId) === String(identifier) ||
            String(item.applicationId) === String(identifier)
        );
    });

    return found?.lamaranId || found?.id || identifier;
}

export default function usePelamar() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [applicants, setApplicants] = useState([]);
    const [search, setSearch] = useState("");
    const [position, setPosition] = useState("all");
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [error, setError] = useState("");

    const statusOptions = useMemo(() => getPelamarStatusOptions(), []);

    const status = useMemo(() => {
        return getStatusFromParams(searchParams, statusOptions);
    }, [searchParams, statusOptions]);

    const priority = useMemo(() => {
        return getPriorityFromParams(searchParams);
    }, [searchParams]);

    const loadApplicants = useCallback(async () => {
        try {
            setIsLoading(true);
            setError("");

            const data = await getPelamarList();

            setApplicants(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.message || "Gagal memuat data pelamar.");
            setApplicants([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadApplicants();
    }, [loadApplicants]);

    const positionOptions = useMemo(() => {
        return getPelamarPositionOptions(applicants);
    }, [applicants]);

    const setStatus = (nextStatus) => {
        const nextParams = new URLSearchParams(searchParams);

        nextParams.delete("priority");

        if (!nextStatus || nextStatus === "process") {
            nextParams.delete("status");
        } else {
            nextParams.set("status", nextStatus);
        }

        setSearchParams(nextParams, { replace: true });
    };

    const filteredApplicants = useMemo(() => {
        const keyword = search.trim();

        return applicants.filter((item) => {
            const matchKeyword =
                !keyword ||
                includesText(item.applicationId, keyword) ||
                includesText(item.fullName, keyword) ||
                includesText(item.email, keyword) ||
                includesText(item.phone, keyword) ||
                includesText(item.jobTitle, keyword);

            const matchStatus =
                status === "all"
                    ? true
                    : status === "process"
                      ? ACTIVE_STATUSES.includes(item.status)
                      : item.status === status;

            const matchPosition = position === "all" || item.jobTitle === position;

            const matchPriority =
                priority !== "urgent"
                    ? true
                    : ACTIVE_STATUSES.includes(item.status) &&
                      URGENT_DEADLINE_LEVELS.includes(item.deadlineLevel);

            return matchKeyword && matchStatus && matchPosition && matchPriority;
        });
    }, [applicants, search, status, position, priority]);

    const selectedApplicant = useMemo(() => {
        if (!selectedId) return null;

        return applicants.find((item) => item.applicationId === selectedId) || null;
    }, [applicants, selectedId]);

    const canDeleteRows = status === "rejected" || status === "expired";

    const openDetail = async (applicant) => {
        if (!applicant?.applicationId) return;

        setSelectedId(applicant.applicationId);

        try {
            const detail = await getPelamarById(applicant.lamaranId || applicant.id);

            if (!detail) return;

            setApplicants((prev) =>
                prev.map((item) =>
                    item.applicationId === detail.applicationId ? detail : item
                )
            );

            setSelectedId(detail.applicationId);
        } catch {
            // Drawer tetap memakai data dari tabel jika request detail gagal.
        }
    };

    const closeDetail = () => {
        setSelectedId(null);
    };

    const handleStatusChange = async (identifier, nextStatus, extra = {}) => {
        try {
            setError("");
            setIsActionLoading(true);

            const lamaranId = getApplicantRecordId(applicants, identifier);
            const updated = await updatePelamarStatus(lamaranId, nextStatus, extra);

            if (!updated) {
                await loadApplicants();
                return null;
            }

            setApplicants((prev) =>
                prev.map((item) =>
                    item.applicationId === updated.applicationId ? updated : item
                )
            );

            setSelectedId(updated.applicationId);

            return updated;
        } catch (err) {
            setError(err?.message || "Gagal memperbarui status pelamar.");
            throw err;
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDeleteApplicant = async (identifier) => {
        try {
            setError("");

            const lamaranId = getApplicantRecordId(applicants, identifier);

            await removePelamar(lamaranId);

            setApplicants((prev) =>
                prev.filter((item) => {
                    return (
                        String(item.id) !== String(lamaranId) &&
                        String(item.lamaranId) !== String(lamaranId) &&
                        String(item.applicationId) !== String(identifier)
                    );
                })
            );

            setSelectedId((current) => {
                if (current === identifier) return null;
                return current;
            });

            return true;
        } catch (err) {
            setError(err?.message || "Gagal menghapus data pelamar.");
            throw err;
        }
    };

    const resetFilter = () => {
        setSearch("");
        setPosition("all");
        setSelectedId(null);
        setSearchParams({}, { replace: true });
    };

    return {
        applicants,
        filteredApplicants,
        selectedApplicant,

        search,
        setSearch,
        status,
        setStatus,
        position,
        setPosition,
        priority,

        statusOptions,
        positionOptions,
        canDeleteRows,

        isLoading,
        isActionLoading,
        error,
        reload: loadApplicants,

        openDetail,
        closeDetail,
        handleStatusChange,
        handleDeleteApplicant,
        resetFilter,
    };
}