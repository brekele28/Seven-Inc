export default function TextareaField({
    label,
    placeholder,
    value,
    onChange,
    rows = 4,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-[14px] leading-relaxed text-neutral-700 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
            />
        </div>
    );
}