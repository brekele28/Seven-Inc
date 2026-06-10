export default function TextareaField({
    label,
    placeholder,
    rows = 4,
    value,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-2xl
                    border border-neutral-200
                    px-4 py-3
                    sm:px-5 sm:py-4
                    text-[13px] sm:text-[14px]
                    outline-none
                    transition
                    focus:border-red-300
                    focus:ring-4
                    focus:ring-red-100
                "
            />
        </div>
    );
}