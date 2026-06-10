import { useCallback, useEffect, useState } from "react";

import { getDashboardData } from "../../../services/admin/dashboard/repository/dashboard.repository";

const INITIAL_STATE = {
    stats: [],
    priorities: [],
    statusSummary: [],
};

export default function useDashboard() {
    const [dashboard, setDashboard] = useState(INITIAL_STATE);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {
        try {
            setIsLoading(true);
            setError("");

            const response = await getDashboardData();

            setDashboard({
                stats: response.stats || [],
                priorities: response.priorities || [],
                statusSummary: response.statusSummary || [],
            });
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Gagal memuat data dashboard."
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    return {
        stats: dashboard.stats,
        priorities: dashboard.priorities,
        statusSummary: dashboard.statusSummary,

        isLoading,
        error,

        reload: loadDashboard,
    };
}