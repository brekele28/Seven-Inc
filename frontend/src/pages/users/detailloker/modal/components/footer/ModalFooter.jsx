import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ModalFooter({ submitting = false, submitState, onCancel }) {
    const status = submitState?.status || "idle";
    const message = submitState?.message || "";

    return (
        <footer className="border-t border-neutral-200 bg-neutral-50/70 px-5 py-4 md:px-8 md:py-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="min-h-[22px]">
                    {status === "success" ? (
                        <div className="flex items-start gap-2 text-[12px] text-emerald-700">
                            <CheckCircle2 className="h-4 w-4 mt-[2px]" />
                            <p className="leading-relaxed">{message}</p>
                        </div>
                    ) : status === "error" ? (
                        <div className="flex items-start gap-2 text-[12px] text-red-600">
                            <AlertCircle className="h-4 w-4 mt-[2px]" />
                            <p className="leading-relaxed">{message}</p>
                        </div>
                    ) : null}
                </div>

                <div className="flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={submitting}
                        className={[
                            "inline-flex items-center justify-center rounded-full",
                            "border border-neutral-200 bg-white",
                            "px-5 py-2.5 text-[12px] font-semibold text-neutral-700",
                            "shadow-sm transition active:scale-95",
                            submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-neutral-50",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50",
                        ].join(" ")}
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        form="apply-form"
                        disabled={submitting || status === "success"}
                        className={[
                            "inline-flex items-center justify-center rounded-full",
                            "bg-red-500 px-6 py-2.5 text-[12px] font-semibold text-white",
                            "shadow-[0_12px_28px_-18px_rgba(239,68,68,0.65)]",
                            "transition active:scale-95",
                            submitting || status === "success"
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-red-600",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50",
                        ].join(" ")}
                    >
                        {submitting ? "Mengirim..." : "Kirim Lamaran"}
                    </button>
                </div>
            </div>
        </footer>
    );
}