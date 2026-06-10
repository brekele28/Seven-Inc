import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
    open = false,
    title = "Konfirmasi",
    description = "Apakah Anda yakin ingin melanjutkan aksi ini?",
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    variant = "danger",
    onCancel,
    onConfirm,
}) {
    if (!open) return null;

    const confirmClass =
        variant === "danger"
            ? "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300"
            : "bg-neutral-950 text-white hover:bg-neutral-800 focus-visible:ring-neutral-300";

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
                <div className="relative p-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
                        aria-label="Tutup dialog"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold text-neutral-950">
                        {title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-7 text-neutral-600">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 bg-neutral-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-[12px] font-extrabold text-neutral-700 shadow-sm transition hover:bg-neutral-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className={[
                            "inline-flex items-center justify-center rounded-full px-5 py-2.5",
                            "text-[12px] font-extrabold shadow-sm transition",
                            "focus:outline-none focus-visible:ring-4",
                            confirmClass,
                        ].join(" ")}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}