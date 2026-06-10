import { CheckCircle2 } from "lucide-react";
import Modal from "../base/Modal";

export default function Sukses({
    open,
    title = "Konfirmasi Pengiriman",
    message,
    onConfirm,
    onCancel,
    confirmText = "Ya, Kirim",
    cancelText = "Tidak",
}) {
    return (
        <Modal
            open={open}
            onClose={onCancel} // ✅ overlay / X / ESC => dianggap cancel
            title={title}
            variant="success"
            footer={
                <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className={[
                            "w-full sm:w-auto",
                            "rounded-xl",
                            "border border-neutral-200",
                            "bg-white",
                            "px-5 py-3 text-[13px] font-semibold text-neutral-800",
                            "shadow-sm transition",
                            "hover:bg-neutral-50 hover:shadow-md",
                            "active:scale-[0.99]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                        ].join(" ")}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className={[
                            "w-full sm:w-auto",
                            "rounded-xl",
                            "bg-emerald-600 text-white",
                            "px-5 py-3 text-[13px] font-semibold",
                            "shadow-[0_14px_34px_rgba(16,185,129,0.28)]",
                            "transition",
                            "hover:bg-emerald-700",
                            "active:scale-[0.99]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70",
                        ].join(" ")}
                    >
                        {confirmText}
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
                        "bg-emerald-50",
                        "grid place-items-center",
                        "ring-1 ring-emerald-200/70",
                    ].join(" ")}
                >
                    <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                </div>

                <div className="min-w-0">
                    <p className="text-[13px] leading-relaxed text-neutral-700">
                        {message ||
                            "Apakah kamu yakin datamu sudah benar? Tekan tombol “Ya, Kirim” untuk membuka WhatsApp dengan pesan yang sudah disiapkan."}
                    </p>

                    <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                        <p className="text-[12px] text-neutral-600">
                            Catatan: WhatsApp akan terbuka dengan pesan siap kirim. Kamu mungkin tetap perlu menekan tombol{" "}
                            <span className="font-semibold text-neutral-800">Kirim</span> di WhatsApp.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}