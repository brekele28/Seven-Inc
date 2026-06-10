export default function TextareaField({
    label,
    placeholder,
    value,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                {label}
            </label>

            <textarea
                rows={4}
                defaultValue={value}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-[13px] outline-none transition duration-300 focus:border-red-300 focus:ring-4 focus:ring-red-100"
            />
        </div>
    );
}