export default function InputField({
    label,
    placeholder,
    value,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] font-medium text-neutral-800 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
            />
        </div>
    );
}