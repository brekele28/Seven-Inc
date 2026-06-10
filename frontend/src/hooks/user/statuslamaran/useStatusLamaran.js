import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import {
    getStatusLamaran,
    getStatusesByPhone,
    normalizePhone,
} from "../../../services/user/statuslamaran/repository/statuslamaran.repository";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function useStatusLamaran() {
    const { applicationId } = useParams();
    const query = useQuery();

    const phoneQ = query.get("phone") || "";
    const phone = normalizePhone(phoneQ);

    const [singleApp, setSingleApp] = useState(null);
    const [listByPhone, setListByPhone] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadStatus() {
            try {
                setIsLoading(true);
                setError("");

                if (applicationId) {
                    const data = await getStatusLamaran(applicationId);

                    if (!active) return;

                    setSingleApp(data);
                    setListByPhone([]);
                    return;
                }

                if (phone) {
                    const list = await getStatusesByPhone(phone);

                    if (!active) return;

                    setListByPhone(list);
                    setSingleApp(list.length === 1 ? list[0] : null);
                    return;
                }

                if (!active) return;

                setSingleApp(null);
                setListByPhone([]);
            } catch (err) {
                if (!active) return;

                setError(err?.message || "Gagal memuat status lamaran.");
                setSingleApp(null);
                setListByPhone([]);
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        loadStatus();

        return () => {
            active = false;
        };
    }, [applicationId, phone]);

    const showNotFound =
        !isLoading &&
        ((!singleApp && applicationId) ||
            (!applicationId && phone && !listByPhone.length));

    const mode = applicationId
        ? "single-by-id"
        : phone && listByPhone.length > 1
          ? "multi-by-phone"
          : phone && listByPhone.length === 1
            ? "single-by-phone"
            : "empty";

    return {
        applicationId,
        phone,
        mode,
        showNotFound,
        singleApp,
        listByPhone,
        isLoading,
        error,
    };
}