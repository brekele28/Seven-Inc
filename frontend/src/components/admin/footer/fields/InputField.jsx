export default function InputField({
    label,
    placeholder,
    value,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                {label}
            </label>

            <input
                type="text"
                defaultValue={value}
                placeholder={placeholder}
                className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-[13px] outline-none transition duration-300 focus:border-red-300 focus:ring-4 focus:ring-red-100"
            />
        </div>
    );
}