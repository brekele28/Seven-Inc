export default function YearFilter({ value, onChange, options = [] }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={[
                "h-12 w-full rounded-2xl border border-neutral-200 bg-white",
                "px-4 text-[13px] font-semibold text-neutral-700",
                "focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-200",
            ].join(" ")}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}