function Label({ label, required }) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-[12px] font-bold text-neutral-900">
                {label}
            </span>

            {required ? (
                <span className="text-[12px] text-red-500">*</span>
            ) : null}
        </div>
    );
}

function isPhoneField(field) {
    const name = String(field?.name || "").toLowerCase();

    return [
        "phone",
        "no_hp",
        "whatsapp",
        "nowhatsapp",
        "no_whatsapp",
        "phonenumber",
    ].includes(name);
}

function getInputType(field) {
    if (isPhoneField(field)) {
        return "tel";
    }

    return field?.type || "text";
}

export default function TextField({ field, value, error, onChange }) {
    const id = `apply_${field.name}`;
    const inputType = getInputType(field);

    return (
        <div className="flex flex-col">
            <Label label={field.label} required={field.required} />

            <input
                id={id}
                name={field.name}
                type={inputType}
                inputMode={inputType === "tel" ? "tel" : undefined}
                value={value ?? ""}
                placeholder={field.placeholder || ""}
                onChange={(e) => onChange?.(field.name, e.target.value)}
                className={[
                    "mt-2 h-12 w-full rounded-xl border bg-white px-4 text-[13px] text-neutral-900",
                    "placeholder:text-neutral-400",
                    "focus:outline-none focus:ring-2",
                    error
                        ? "border-red-300 focus:ring-red-200"
                        : "border-neutral-200 focus:border-neutral-300 focus:ring-neutral-200",
                ].join(" ")}
            />

            {error ? (
                <p className="mt-2 text-[11px] text-red-600">
                    {error}
                </p>
            ) : field.helperText ? (
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                    {field.helperText}
                </p>
            ) : null}
        </div>
    );
}