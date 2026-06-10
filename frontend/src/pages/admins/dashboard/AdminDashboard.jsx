import useDashboard from "../../../hooks/admin/dashboard/useDashboard";

import DashboardHeader from "./components/header/DashboardHeader";
import StatsGrid from "./components/stats/StatsGrid";
import PriorityPanel from "./components/priority/PriorityPanel";
import StatusSummary from "./components/status/StatusSummary";

export default function AdminDashboard() {
    const {
        stats,
        priorities,
        statusSummary,

        isLoading,
        error,
        reload,
    } = useDashboard();

    return (
        <div className="space-y-6">
            <DashboardHeader />

            {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
                    <p className="text-[12px] font-extrabold text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={reload}
                        className="mt-3 rounded-full bg-red-600 px-4 py-2 text-[12px] font-bold text-white transition hover:bg-red-700"
                    >
                        Muat Ulang
                    </button>
                </div>
            ) : null}

            {isLoading ? (
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-10 text-center">
                    <p className="text-[13px] font-semibold text-neutral-500">
                        Memuat data dashboard...
                    </p>
                </div>
            ) : (
                <>
                    <StatsGrid stats={stats} />

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.9fr]">
                        <PriorityPanel priorities={priorities} />

                        <StatusSummary items={statusSummary} />
                    </div>
                </>
            )}
        </div>
    );
}