import { XCircle } from "lucide-react";
import Modal from "../base/Modal";

export default function Gagal({
    open,
    title = "Gagal",
    message,
    onClose,
    closeText = "Tutup",
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            variant="error"
            footer={
                <div className="mt-2 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className={[
                            "rounded-xl",
                            "bg-red-600 text-white",
                            "px-5 py-3 text-[13px] font-semibold",
                            "shadow-[0_14px_34px_rgba(239,68,68,0.26)]",
                            "transition",
                            "hover:bg-red-700",
                            "active:scale-[0.99]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70",
                        ].join(" ")}
                    >
                        {closeText}
                    </button>
                </div>
            }
        >
            <div className="flex gap-4">
                <div
                    className={[
                        "mt-0.5",
                        "h-11 w-11 shrink-0",
                        "rounded-2xl",
                        "bg-red-50",
                        "grid place-items-center",
                        "ring-1 ring-red-200/70",
                    ].join(" ")}
                >
                    <XCircle className="h-6 w-6 text-red-700" />
                </div>

                <div className="min-w-0">
                    <p className="text-[13px] leading-relaxed text-neutral-700">
                        {message || "Terjadi masalah. Silakan periksa kembali data kamu dan coba lagi."}
                    </p>
                </div>
            </div>
        </Modal>
    );
}