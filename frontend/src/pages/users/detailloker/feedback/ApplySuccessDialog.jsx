import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, BadgeCheck } from "lucide-react";
import SuccessIdBox from "./components/content/SuccessIdBox";

export default function ApplySuccessDialog({
    open = false,
    applicationId = "",
    jobTitle = "Posisi",
    onClose,
    onGoCheckStatus,
}) {
    const overlayRef = useRef(null);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };

        window.addEventListener("keydown", onKeyDown);

        const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            clearTimeout(t);
        };
    }, [open, onClose]);

    if (!open) return null;

    const onOverlay = (e) => {
        if (e.target === overlayRef.current) onClose?.();
    };

    return createPortal(
        <div
            ref={overlayRef}
            onMouseDown={onOverlay}
            className="
                fixed inset-0 z-[999]
                flex items-end md:items-center justify-center
                bg-black/45 backdrop-blur-[6px]
                p-0 md:p-6
            "
            aria-modal="true"
            role="dialog"
            aria-label="Lamaran berhasil dikirim"
        >
            <div
                className="
                    relative w-full md:max-w-[720px]
                    rounded-t-[26px] md:rounded-[26px]
                    bg-white
                    shadow-[0_20px_70px_rgba(0,0,0,0.25)]
                    overflow-hidden
                    border border-white/30
                "
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div
                    className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(60% 70% at 35% 0%, rgba(16,185,129,0.20) 0%, rgba(59,130,246,0.10) 35%, rgba(255,255,255,0) 70%)",
                    }}
                />

                <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => onClose?.()}
                    className="
                        absolute right-4 top-4 z-10
                        inline-flex h-10 w-10 items-center justify-center
                        rounded-full border border-neutral-200 bg-white/90
                        shadow-sm
                        transition hover:bg-neutral-50 active:scale-95
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50
                    "
                    aria-label="Tutup"
                >
                    <X className="h-5 w-5 text-neutral-700" />
                </button>

                <div className="relative px-5 pt-6 pb-5 md:px-8 md:pt-8 md:pb-7">
                    <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-2xl border border-neutral-200 bg-white flex items-center justify-center shadow-sm">
                            <BadgeCheck className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div>
                            <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.35em] text-neutral-500 uppercase">
                                Lamaran Terkirim
                            </p>
                            <h2 className="mt-2 text-[20px] md:text-[26px] font-extrabold text-neutral-900 leading-[1.15]">
                                Berhasil! Simpan ID lamaranmu
                            </h2>
                            <p className="mt-2 text-[12px] md:text-[13px] leading-[1.85] text-neutral-600 max-w-[640px]">
                                Lamaran untuk posisi{" "}
                                <span className="font-semibold text-neutral-900">{jobTitle}</span>{" "}
                                sudah kami terima. Gunakan ID di bawah untuk cek status supaya kamu tidak ter-ghosting.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <SuccessIdBox applicationId={applicationId} />
                    </div>

                    <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 px-5 py-4">
                        <p className="text-[12px] font-extrabold text-neutral-900">
                            Apakah Anda ingin cek status lamaran sekarang?
                        </p>
                        <p className="mt-1 text-[12px] leading-[1.75] text-neutral-600">
                            Anda akan diarahkan ke halaman status menggunakan ID di atas.
                        </p>

                        <div className="mt-4 flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-end">
                            <button
                                type="button"
                                onClick={() => onClose?.()}
                                className="
                                    inline-flex items-center justify-center rounded-full
                                    border border-neutral-200 bg-white
                                    px-6 py-2.5 text-[12px] font-semibold text-neutral-700
                                    shadow-sm transition hover:bg-neutral-50 active:scale-95
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50
                                "
                            >
                                Nanti Saja
                            </button>

                            <button
                                type="button"
                                onClick={() => onGoCheckStatus?.()}
                                className="
                                    inline-flex items-center justify-center rounded-full
                                    bg-red-500 px-7 py-2.5 text-[12px] font-semibold text-white
                                    shadow-[0_12px_28px_-18px_rgba(239,68,68,0.65)]
                                    transition hover:bg-red-600 active:scale-95
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50
                                "
                            >
                                Iya, Cek Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}