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
            <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-500" />

                        <h2 className="text-[22px] font-black text-neutral-950">
                            Hapus Gambar
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <X />
                    </button>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-neutral-500">
                    Apakah Anda yakin ingin menghapus gambar ini?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-2xl border border-neutral-200 px-5 py-3 text-[13px] font-bold"
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
    );
}