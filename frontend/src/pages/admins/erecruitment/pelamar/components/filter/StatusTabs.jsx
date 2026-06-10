export default function StatusTabs({ value, onChange, options = [] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const active = value === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange?.(option.value)}
                        className={[
                            "rounded-full border px-4 py-2",
                            "text-[12px] font-extrabold transition",
                            active
                                ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                        ].join(" ")}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}