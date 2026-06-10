import { useMemo, useCallback } from "react";

import Hero from "./components/hero/Hero";
import Featured from "./components/featured/Featured";

import NewsList from "./components/news/NewsList";
import Pagination from "./components/news/Pagination";

import { NEWS_PAGE_SIZE, getTotalPages } from "../../../services/user/berita/beritaRepository";
import useNewsQueryPage from "../../../hooks/user/berita/useNewsQueryPage";

export default function Berita() {
    const totalPages = useMemo(() => getTotalPages(NEWS_PAGE_SIZE), []);

    const { currentPage, setCurrentPage } = useNewsQueryPage({
        totalPages,
        pageParamKey: "page",
    });

    const handleChangePage = useCallback(
        (nextPage) => {
            setCurrentPage(nextPage);
        },
        [setCurrentPage]
    );

    return (
        <>
            <Hero />
            <Featured />

            <NewsList currentPage={currentPage} pageSize={NEWS_PAGE_SIZE} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handleChangePage}
                className="py-10"
            />
        </>
    );
}