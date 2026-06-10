import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getDetailLokerById } from "../../../pages/users/detailloker/repository/detailloker.repository";

export default function useDetailLoker() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [openApply, setOpenApply] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [applicationId, setApplicationId] = useState("");

    useEffect(() => {
        let active = true;

        async function loadDetail() {
            try {
                setIsLoading(true);
                setError("");

                const detail = await getDetailLokerById(id);

                if (active) {
                    setData(detail);
                }
            } catch (err) {
                if (active) {
                    setData(null);
                    setError(err?.message || "Gagal memuat detail lowongan.");
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        loadDetail();

        return () => {
            active = false;
        };
    }, [id]);

    const handleApply = () => setOpenApply(true);

    const handleApplySuccess = (newId) => {
        setApplicationId(String(newId || ""));
        setSuccessOpen(true);
    };

    const goCheckStatus = () => {
        setSuccessOpen(false);
        navigate(`/cek-lamaran/status/${applicationId}`);
    };

    return {
        data,
        isLoading,
        error,
        openApply,
        setOpenApply,
        successOpen,
        setSuccessOpen,
        applicationId,
        handleApply,
        handleApplySuccess,
        goCheckStatus,
    };
}