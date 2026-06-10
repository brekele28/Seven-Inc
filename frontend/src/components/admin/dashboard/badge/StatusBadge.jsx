export default function StatusBadge({ status = "submitted", label = "" }) {
    const statusClass = {
        submitted: "bg-blue-50 text-blue-700 border-blue-100",
        screening: "bg-amber-50 text-amber-700 border-amber-100",
        interview: "bg-violet-50 text-violet-700 border-violet-100",
        accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
        rejected: "bg-red-50 text-red-700 border-red-100",
        expired: "bg-neutral-100 text-neutral-700 border-neutral-200",
    };

    return (
        <span
            className={[
                "inline-flex items-center rounded-full border px-3 py-1",
                "text-[11px] font-bold",
                statusClass[status] || statusClass.submitted,
            ].join(" ")}
        >
            {label}
        </span>
    );
}