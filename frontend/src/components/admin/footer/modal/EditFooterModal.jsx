import { X } from "lucide-react";

import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function EditFooterModal({
    open,
    onClose,
    title,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-[32px] bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                            Edit Footer
                        </p>

                        <h2 className="mt-2 text-[28px] font-black text-neutral-950">
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 transition duration-300 hover:bg-neutral-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-5 p-5">
                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Value
                        </label>

                        <input
                            type="text"
                            className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition duration-300 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <SecondaryButton onClick={onClose}>
                            Batal
                        </SecondaryButton>

                        <PrimaryButton>
                            Simpan
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}