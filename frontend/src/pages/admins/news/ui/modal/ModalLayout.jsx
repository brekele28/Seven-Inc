import { X } from "lucide-react";

export default function ModalLayout({
    open,
    onClose,
    title,
    children,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6">
            <div className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-7">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                            News Modal
                        </p>

                        <h2 className="mt-2 text-[24px] font-black text-neutral-950">
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-red-50 hover:text-red-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-neutral-50 px-5 py-5 sm:px-7 sm:py-7">
                    {children}
                </div>
            </div>
        </div>
    );
}