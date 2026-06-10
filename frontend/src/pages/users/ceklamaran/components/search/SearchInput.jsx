import { Hash, Phone } from "lucide-react";

export default function SearchInput({
    mode,
    value,
    placeholder,
    onChange,
    suggestedPhone = "",
}) {
    const Icon = mode === "id" ? Hash : Phone;

    const helperText =
        mode === "id"
            ? "Contoh: 7INC-xxxx-xxxxxx"
            : suggestedPhone
                ? `Nomor terakhir terdeteksi: ${suggestedPhone}`
                : "Contoh: 081234567890 atau +6281234567890";

    return (
        <div className="w-full">
            <label className="mb-2 block text-[12px] font-extrabold text-neutral-900">
                {mode === "id" ? "ID Lamaran" : "Nomor HP / WhatsApp"}
            </label>

            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <input
                    value={value ?? ""}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    autoComplete={mode === "phone" ? "tel" : "off"}
                    inputMode={mode === "phone" ? "tel" : "text"}
                    className={[
                        "h-14 w-full rounded-2xl border bg-white pl-12 pr-4",
                        "text-[13px] font-semibold text-neutral-900",
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
                        "placeholder:text-neutral-400 placeholder:font-medium",
                        "transition-all duration-200",
                        "focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10",
                        "border-neutral-200",
                    ].join(" ")}
                />
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                {helperText}
            </p>
        </div>
    );
}