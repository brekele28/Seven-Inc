export default function TextareaField({
    label,
    placeholder,
    rows = 4,
    value,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-3xl
                    border border-neutral-200
                    bg-white
                    px-4 py-4
                    sm:px-5
                    text-[13px] sm:text-[14px]
                    leading-relaxed
                    text-neutral-700
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