import { FileText, X } from "lucide-react";

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

function formatFileSize(size = 0) {
    if (!size) return "0 MB";

    const mb = size / (1024 * 1024);

    return `${mb.toFixed(2)} MB`;
}

function getAcceptValue(accept) {
    if (Array.isArray(accept)) return accept.join(",");
    return accept || "application/pdf";
}

export default function FileUploadField({ field, value, error, onChange }) {
    const id = `apply_${field.name}`;
    const accept = getAcceptValue(field.accept);
    const maxSizeMB = Number(field.maxSizeMB || 5);
    const selectedFile = value instanceof File ? value : null;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;

        if (!file) {
            onChange?.(field.name, null);
            return;
        }

        onChange?.(field.name, file);
    };

    const handleClear = () => {
        onChange?.(field.name, null);

        const input = document.getElementById(id);

        if (input) {
            input.value = "";
        }
    };

    return (
        <div className="flex flex-col">
            <Label label={field.label} required={field.required} />

            <input
                id={id}
                name={field.name}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="sr-only"
            />

            <label
                htmlFor={id}
                className={[
                    "mt-2 block cursor-pointer rounded-2xl border bg-white p-4",
                    "transition hover:bg-neutral-50",
                    error ? "border-red-300" : "border-neutral-200",
                ].join(" ")}
            >
                {selectedFile ? (
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
                                <FileText className="h-5 w-5 text-neutral-700" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-[13px] font-extrabold text-neutral-900">
                                    {selectedFile.name}
                                </p>
                                <p className="mt-1 text-[11px] text-neutral-500">
                                    {formatFileSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="
                                inline-flex items-center justify-center gap-2
                                rounded-full border border-neutral-200 bg-white
                                px-4 py-2 text-[12px] font-semibold text-neutral-700
                                shadow-sm transition hover:bg-neutral-50 active:scale-95
                            "
                        >
                            <X className="h-4 w-4" />
                            Hapus
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50/60 px-4 py-8 text-center">
                        <FileText className="h-7 w-7 text-neutral-500" />

                        <p className="mt-3 text-[13px] font-extrabold text-neutral-900">
                            Klik untuk upload CV / Portfolio
                        </p>

                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                            Format PDF. Maksimal {maxSizeMB}MB.
                        </p>
                    </div>
                )}
            </label>

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