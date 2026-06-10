export default function StatusFilter({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={[
                "h-13 w-full rounded-2xl border border-neutral-200 bg-white px-4",
                "text-[13px] font-extrabold text-neutral-800",
                "transition focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10",
            ].join(" ")}
        >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="draft">Draft</option>
            <option value="closed">Ditutup</option>
            <option value="expired">Expired</option>
        </select>
    );
}