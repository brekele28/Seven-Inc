import {
    ShieldCheck,
    X,
} from "lucide-react";

export default function ConfirmSaveModal({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-3 sm:p-4 backdrop-blur-sm">
            <div
                className="
                    w-full max-w-lg
                    max-h-[calc(100vh-24px)]
                    overflow-y-auto
                    rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]
                    bg-white
                    shadow-[0_25px_80px_rgba(0,0,0,0.18)]
                "
            >
                <div
                    className="
                        relative border-b border-emerald-100
                        bg-gradient-to-br from-white via-emerald-50/60 to-white
                        p-5 sm:p-6 lg:p-7
                    "
                >
                    <div className="absolute right-0 top-0 h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full bg-emerald-100/50 blur-3xl" />

                    <div className="relative flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                            <div
                                className="
                                    flex shrink-0 items-center justify-center
                                    h-13 w-13
                                    sm:h-15 sm:w-15
                                    lg:h-16 lg:w-16
                                    rounded-2xl sm:rounded-3xl
                                    border border-emerald-100
                                    bg-emerald-50
                                "
                            >
                                <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-emerald-600" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-emerald-600">
                                    Confirm Action
                                </p>

                                <h2 className="mt-2 text-[24px] sm:text-[26px] lg:text-[28px] font-black leading-tight text-neutral-950">
                                    Simpan Perubahan
                                </h2>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="shrink-0 cursor-pointer text-neutral-500 transition hover:text-neutral-900"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-5 sm:p-6 lg:p-7">
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-neutral-700">
                        Apakah Anda yakin ingin menyimpan seluruh perubahan?
                    </p>

                    <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                        <p className="text-[12px] sm:text-[13px] leading-relaxed text-emerald-700">
                            Pastikan seluruh informasi, gambar, dan konten yang
                            telah diperbarui sudah sesuai sebelum dipublikasikan
                            pada halaman E-Recruitment.
                        </p>
                    </div>

                    <div className="mt-6 sm:mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                w-full sm:w-auto
                                cursor-pointer rounded-2xl border border-neutral-200
                                bg-white px-5 py-3 text-[13px] font-bold
                                text-neutral-700 transition hover:bg-neutral-100
                            "
                        >
                            Kembali
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className="
                                w-full sm:w-auto
                                cursor-pointer rounded-2xl bg-red-600
                                px-6 py-3 text-[13px] font-bold text-white
                                transition hover:bg-red-700
                                shadow-[0_12px_30px_rgba(239,68,68,0.25)]
                            "
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}