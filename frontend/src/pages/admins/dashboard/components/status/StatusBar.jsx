import StatusBadge from "../../../../../components/admin/dashboard/badge/StatusBadge";

export default function StatusBar({ item }) {
    const barClass = {
        submitted: "bg-blue-500",
        screening: "bg-amber-500",
        interview: "bg-violet-500",
        accepted: "bg-emerald-500",
        rejected: "bg-red-500",
        expired: "bg-neutral-500",
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} label={item.label} />
                    <span className="text-[12px] font-semibold text-neutral-500">
                        {item.value} pelamar
                    </span>
                </div>

                <span className="text-[12px] font-bold text-neutral-700">
                    {item.percentage}%
                </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                    className={[
                        "h-full rounded-full",
                        barClass[item.status] || "bg-neutral-500",
                    ].join(" ")}
                    style={{ width: `${item.percentage}%` }}
                />
            </div>
        </div>
    );
}