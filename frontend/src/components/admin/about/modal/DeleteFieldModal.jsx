import {
    AlertTriangle,
    X,
} from "lucide-react";

import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function DeleteFieldModal({
    open,
    onClose,
    onConfirm,
    title = "Hapus Data",
    description = "Data yang dihapus tidak dapat dikembalikan lagi.",
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-2xl">
                <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border border-red-100 bg-white shadow-sm sm:h-16 sm:w-16">
                                <AlertTriangle className="h-7 w-7 text-red-500 sm:h-8 sm:w-8" />
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                                    Delete Field
                                </p>

                                <h2 className="mt-2 text-[22px] font-black leading-tight text-neutral-950 sm:text-[28px]">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:bg-red-50"
                        >
                            <X className="h-5 w-5 text-neutral-700" />
                        </button>
                    </div>
                </div>

                <div className="p-6 sm:p-7">
                    <p className="text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                        {description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <SecondaryButton onClick={onClose}>
                            Batal
                        </SecondaryButton>

                        <PrimaryButton onClick={onConfirm}>
                            Hapus
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}