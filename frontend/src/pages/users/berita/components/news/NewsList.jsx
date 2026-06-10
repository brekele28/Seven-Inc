import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NewsCard from "./NewsCard";
import { getAllNews, NEWS_PAGE_SIZE } from "../../../../../services/user/berita/beritaRepository";
import { getPageSlice } from "../../../../../hooks/user/berita/usePagination";

import Loader from "../../../../../components/user/ui/Loader/loader";
import useDelayedNavigate from "../../../../../hooks/user/navbar/useDelayedNavigate";

export default function NewsList({ currentPage = 1, pageSize = NEWS_PAGE_SIZE }) {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Data dari repository (dummy sekarang, API nanti)
    const allItems = useMemo(() => getAllNews(), []);

    const { start, end } = getPageSlice(currentPage, pageSize);
    const pageItems = allItems.slice(start, end);

    // ✅ pakai global hook (hemat, tidak duplikasi)
    const nav = useDelayedNavigate({
        navigate,
        currentPath: `${location.pathname}${location.search || ""}`,
        delayMs: 1500,
        scrollBehavior: "auto",
    });

    const handleOpen = useCallback(
        (item) => {
            // ✅ bawa page sekarang ke detail: /berita/:id?page=44
            nav.delayedNavigate(`/berita/${item.id}?page=${currentPage}`);
        },
        [currentPage, nav]
    );

    return (
        <>
            {nav.isLoading && <Loader />}

            <section className="bg-white py-14 md:py-6" aria-label="Daftar berita terbaru">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {pageItems.map((item) => (
                        <NewsCard key={item.id} item={item} onOpen={handleOpen} />
                    ))}
                </div>
            </section>
        </>
    );
}