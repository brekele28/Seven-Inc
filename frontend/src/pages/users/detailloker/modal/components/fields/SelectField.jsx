import { ChevronDown } from "lucide-react";

function Label({ label, required }) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-[12px] font-bold text-neutral-900">{label}</span>
            {required ? <span className="text-red-500 text-[12px]">*</span> : null}
        </div>
    );
}

export default function SelectField({ field, value, error, onChange }) {
    const id = `apply_${field.name}`;
    const options = Array.isArray(field.options) ? field.options : [];

    return (
        <div className="flex flex-col">
            <Label label={field.label} required={field.required} />

            <div className="relative mt-2">
                <select
                    id={id}
                    name={field.name}
                    value={value ?? ""}
                    onChange={(e) => onChange?.(field.name, e.target.value)}
                    className={[
                        "h-12 w-full appearance-none rounded-xl border bg-white pl-4 pr-12 text-[13px] text-neutral-900",
                        "focus:outline-none focus:ring-2",
                        error
                            ? "border-red-300 focus:ring-red-200"
                            : "border-neutral-200 focus:border-neutral-300 focus:ring-neutral-200",
                    ].join(" ")}
                >
                    <option value="" disabled>
                        {field.placeholder || "Pilih opsi"}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-600" />
            </div>

            {error ? <p className="mt-2 text-[11px] text-red-600">{error}</p> : null}
        </div>
    );
}