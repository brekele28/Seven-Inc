import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PAGE_SIZE, LOAD_MORE_DELAY_MS } from "./constants";
import { getJobs } from "../../../pages/users/lowongankerja/repository/lowongankerja.repository";

export default function useLowonganKerja() {
    const navigate = useNavigate();

    const [limit, setLimit] = useState(PAGE_SIZE);
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState("");

    const loadMoreTimeoutRef = useRef(null);

    const canLoadMore = jobs.length < totalJobs;

    useEffect(() => {
        let active = true;

        async function loadJobs() {
            try {
                setIsLoading(true);
                setError("");

                const result = await getJobs({ limit });

                if (active) {
                    setJobs(result.jobs);
                    setTotalJobs(result.total);
                }
            } catch (err) {
                if (active) {
                    setError(err?.message || "Gagal memuat data lowongan.");
                    setJobs([]);
                    setTotalJobs(0);
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                    setIsLoadingMore(false);
                }
            }
        }

        loadJobs();

        return () => {
            active = false;
        };
    }, [limit]);

    useEffect(() => {
        return () => {
            if (loadMoreTimeoutRef.current) {
                clearTimeout(loadMoreTimeoutRef.current);
            }
        };
    }, []);

    const onJobClick = (job) => {
        if (!job?.id) return;

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        navigate(`/lowongan-kerja/${job.id}`);
    };

    const onLoadMore = () => {
        if (isLoadingMore || !canLoadMore) return;

        setIsLoadingMore(true);

        if (loadMoreTimeoutRef.current) {
            clearTimeout(loadMoreTimeoutRef.current);
        }

        loadMoreTimeoutRef.current = setTimeout(() => {
            setLimit((prev) => Math.min(prev + PAGE_SIZE, totalJobs));
        }, LOAD_MORE_DELAY_MS);
    };

    return {
        jobs,
        totalJobs,
        canLoadMore,
        isLoading,
        isLoadingMore,
        error,
        onJobClick,
        onLoadMore,
    };
}