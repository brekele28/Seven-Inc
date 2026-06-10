export default function TextareaField({
    label,
    placeholder,
    rows = 4,
    value,
    onChange,
    disabled = false,
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
                disabled={disabled}
                placeholder={placeholder}
                className={[
                    "w-full rounded-2xl px-4 py-4 text-[13px]",
                    "leading-relaxed outline-none transition",
                    "sm:px-5 sm:text-[14px]",

                    disabled
                        ? [
                              "cursor-default",
                              "border border-neutral-200",
                              "bg-neutral-100",
                              "text-neutral-600",
                          ].join(" ")
                        : [
                              "border border-neutral-200",
                              "bg-white",
                              "text-neutral-700",
                              "focus:border-red-300",
                              "focus:ring-4",
                              "focus:ring-red-100",
                          ].join(" "),
                ].join(" ")}
            />
        </div>
    );
}