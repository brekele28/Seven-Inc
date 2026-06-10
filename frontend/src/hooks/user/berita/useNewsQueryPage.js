import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function toSafePage(value, totalPages) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 1;
    return Math.max(1, Math.min(totalPages, n));
}

/**
 * Ngurus:
 * - ambil ?page dari URL
 * - simpan ke state
 * - kalau state berubah, update URL
 * - kalau user back/forward atau edit URL manual, state ikut
 */
export default function useNewsQueryPage({ totalPages = 1, pageParamKey = "page" } = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = useMemo(() => {
        const pageFromUrl = searchParams.get(pageParamKey);
        return toSafePage(pageFromUrl, totalPages);
    }, [searchParams, totalPages, pageParamKey]);

    const [currentPage, setCurrentPage] = useState(initialPage);

    // sinkron state kalau URL berubah (back/forward atau edit manual)
    useEffect(() => {
        setCurrentPage(initialPage);
    }, [initialPage]);

    // saat state berubah -> update URL
    useEffect(() => {
        const safe = toSafePage(currentPage, totalPages);
        setSearchParams({ [pageParamKey]: String(safe) }, { replace: true });
    }, [currentPage, setSearchParams, totalPages, pageParamKey]);

    return { currentPage, setCurrentPage };
}