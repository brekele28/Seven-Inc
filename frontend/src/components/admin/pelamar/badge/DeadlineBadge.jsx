export default function DeadlineBadge({ level = "safe", label = "-" }) {
    const levelClass = {
        safe: "border-emerald-100 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200 bg-amber-50 text-amber-700",
        danger: "border-red-100 bg-red-50 text-red-700",
        expired: "border-neutral-200 bg-neutral-50 text-neutral-700",
    };

    return (
        <span
            className={[
                "inline-flex rounded-full border px-3 py-1",
                "text-[11px] font-extrabold",
                levelClass[level] || levelClass.safe,
            ].join(" ")}
        >
            {label}
        </span>
    );
}