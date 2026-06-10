import {
    AlertTriangle,
    X,
} from "lucide-react";

import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function DeleteConfirmModal({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 transition duration-300 hover:bg-neutral-100"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <h3 className="mt-5 text-[24px] font-black text-neutral-950">
                    Hapus Data?
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">
                    Data yang sudah dihapus tidak dapat dikembalikan lagi.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <SecondaryButton onClick={onClose}>
                        Batal
                    </SecondaryButton>

                    <PrimaryButton onClick={onConfirm}>
                        Hapus
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}