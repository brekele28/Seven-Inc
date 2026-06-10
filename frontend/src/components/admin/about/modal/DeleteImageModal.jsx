import {
    AlertTriangle,
    X,
} from "lucide-react";

export default function DeleteImageModal({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl">
                <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-white">
                                <AlertTriangle className="h-7 w-7 text-red-500" />
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                                    Delete Image
                                </p>

                                <h2 className="mt-1 text-[22px] font-black text-neutral-950">
                                    Hapus Gambar
                                </h2>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white transition hover:bg-red-50"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-[14px] leading-relaxed text-neutral-600">
                        Apakah Anda yakin ingin menghapus gambar ini?
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-2xl border border-neutral-200 px-5 py-3 text-[13px] font-bold text-neutral-700 transition hover:bg-neutral-100"
                        >
                            Batal
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className="cursor-pointer rounded-2xl bg-red-600 px-5 py-3 text-[13px] font-bold text-white transition hover:bg-red-700"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}