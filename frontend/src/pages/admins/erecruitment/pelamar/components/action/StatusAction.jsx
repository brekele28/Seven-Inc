export default function StatusAction({
    label = "",
    description = "",
    tone = "neutral",
    disabled = false,
    loading = false,
    onClick,
}) {
    const toneClass = {
        neutral: "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50",
        amber: "border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100",
        violet: "border-violet-100 bg-violet-50 text-violet-700 hover:bg-violet-100",
        emerald: "border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
        red: "border-red-100 bg-red-50 text-red-700 hover:bg-red-100",
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            className={[
                "w-full rounded-2xl border px-4 py-3 text-left transition",
                isDisabled
                    ? "cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-400"
                    : toneClass[tone] || toneClass.neutral,
            ].join(" ")}
        >
            <p className="text-[12px] font-extrabold">
                {loading ? "Memproses..." : label}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed opacity-80">
                {description}
            </p>
        </button>
    );
}