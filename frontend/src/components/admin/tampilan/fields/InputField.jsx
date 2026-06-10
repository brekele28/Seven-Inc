export default function InputField({
    label,
    placeholder,
    value,
    onChange,
    disabled = false,
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                {label}
            </label>

            <input
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={[
                    "h-13 w-full rounded-2xl border px-4 text-[13px]",
                    "font-semibold outline-none transition",
                    "sm:h-14 sm:px-5 sm:text-[14px]",

                    disabled
                        ? [
                              "cursor-default",
                              "border-neutral-200",
                              "bg-neutral-100",
                              "text-neutral-600",
                          ].join(" ")
                        : [
                              "border-neutral-200",
                              "bg-white",
                              "text-neutral-800",
                              "focus:border-red-300",
                              "focus:ring-4",
                              "focus:ring-red-100",
                          ].join(" "),
                ].join(" ")}
            />
        </div>
    );
}