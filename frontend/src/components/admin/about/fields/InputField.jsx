export default function InputField({
    label,
    placeholder,
    value,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    h-12 sm:h-14
                    w-full
                    rounded-2xl
                    border border-neutral-200
                    px-4 sm:px-5
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