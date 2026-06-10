import { useCallback, useEffect, useMemo, useState } from "react";

import {
    getArchiveById,
    getArchiveList,
    getArchivePositionOptions,
    getArchiveYearOptions,
} from "../../../services/admin/archiving/repository/archiving.repository";

function includesText(source, keyword) {
    return String(source || "")
        .toLowerCase()
        .includes(String(keyword || "").toLowerCase());
}

export default function useArchiving() {
    const [archives, setArchives] = useState([]);

    const [search, setSearch] = useState("");
    const [position, setPosition] = useState("all");
    const [year, setYear] = useState("all");
    const [selectedId, setSelectedId] = useState(null);
    const [reportOpen, setReportOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadArchives = useCallback(async () => {
        try {
            setIsLoading(true);
            setError("");

            const data = await getArchiveList();

            setArchives(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.message || "Gagal memuat data archiving.");
            setArchives([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadArchives();
    }, [loadArchives]);

    const positionOptions = useMemo(() => {
        return getArchivePositionOptions(archives);
    }, [archives]);

    const yearOptions = useMemo(() => {
        return getArchiveYearOptions(archives);
    }, [archives]);

    const filteredArchives = useMemo(() => {
        const keyword = search.trim();

        return archives.filter((item) => {
            const matchKeyword =
                !keyword ||
                includesText(item.applicationId, keyword) ||
                includesText(item.fullName, keyword) ||
                includesText(item.email, keyword) ||
                includesText(item.phone, keyword) ||
                includesText(item.jobTitle, keyword);

            const matchPosition = position === "all" || item.jobTitle === position;
            const matchYear = year === "all" || item.archiveYear === year;

            return matchKeyword && matchPosition && matchYear;
        });
    }, [archives, search, position, year]);

    const selectedArchive = useMemo(() => {
        if (!selectedId) return null;

        return archives.find((item) => item.applicationId === selectedId) || null;
    }, [archives, selectedId]);

    const reportMeta = useMemo(() => {
        const selectedPosition =
            positionOptions.find((item) => item.value === position)?.label ||
            "Semua Posisi";

        const selectedYear =
            yearOptions.find((item) => item.value === year)?.label ||
            "Semua Tahun";

        const exportedAt = new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date());

        return {
            title: "Laporan Data Pelamar Diterima",
            company: "Seven INC",
            position: selectedPosition,
            year: selectedYear,
            exportedAt,
            total: filteredArchives.length,
        };
    }, [filteredArchives.length, position, positionOptions, year, yearOptions]);

    const openDetail = async (archive) => {
        if (!archive?.applicationId) return;

        setSelectedId(archive.applicationId);

        try {
            const detail = await getArchiveById(archive.applicationId);

            if (!detail) return;

            setArchives((prev) =>
                prev.map((item) =>
                    item.applicationId === detail.applicationId ? detail : item
                )
            );
        } catch {
            // Detail tetap memakai data dari tabel jika request detail gagal.
        }
    };

    const closeDetail = () => {
        setSelectedId(null);
    };

    const resetFilter = () => {
        setSearch("");
        setPosition("all");
        setYear("all");
        setSelectedId(null);
    };

    const openReport = () => {
        setReportOpen(true);
    };

    const closeReport = () => {
        setReportOpen(false);
    };

    return {
        archives,
        filteredArchives,
        selectedArchive,

        search,
        setSearch,
        position,
        setPosition,
        year,
        setYear,

        positionOptions,
        yearOptions,

        isLoading,
        error,
        reload: loadArchives,

        reportOpen,
        reportMeta,
        openReport,
        closeReport,

        openDetail,
        closeDetail,
        resetFilter,
    };
}