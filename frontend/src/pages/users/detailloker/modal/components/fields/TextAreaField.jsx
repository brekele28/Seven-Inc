function Label({ label, required }) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-[12px] font-bold text-neutral-900">{label}</span>
            {required ? <span className="text-red-500 text-[12px]">*</span> : null}
        </div>
    );
}

export default function TextAreaField({ field, value, error, onChange }) {
    const id = `apply_${field.name}`;

    return (
        <div className="flex flex-col md:col-span-2">
            <Label label={field.label} required={field.required} />

            <textarea
                id={id}
                name={field.name}
                value={value ?? ""}
                placeholder={field.placeholder || ""}
                onChange={(e) => onChange?.(field.name, e.target.value)}
                className={[
                    "mt-2 min-h-[120px] w-full resize-none rounded-xl border bg-white px-4 py-3 text-[13px] text-neutral-900",
                    "placeholder:text-neutral-400",
                    "focus:outline-none focus:ring-2",
                    error
                        ? "border-red-300 focus:ring-red-200"
                        : "border-neutral-200 focus:border-neutral-300 focus:ring-neutral-200",
                ].join(" ")}
            />

            {error ? <p className="mt-2 text-[11px] text-red-600">{error}</p> : null}
        </div>
    );
}