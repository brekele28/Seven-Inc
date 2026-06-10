export default function StatusBadge({ status = "submitted", label = "" }) {
    const statusClass = {
        submitted: "border-blue-100 bg-blue-50 text-blue-700",
        screening: "border-amber-100 bg-amber-50 text-amber-700",
        interview: "border-violet-100 bg-violet-50 text-violet-700",
        accepted: "border-emerald-100 bg-emerald-50 text-emerald-700",
        rejected: "border-red-100 bg-red-50 text-red-700",
        expired: "border-neutral-200 bg-neutral-50 text-neutral-700",
    };

    return (
        <span
            className={[
                "inline-flex rounded-full border px-3 py-1",
                "text-[11px] font-extrabold",
                statusClass[status] || statusClass.submitted,
            ].join(" ")}
        >
            {label}
        </span>
    );
}