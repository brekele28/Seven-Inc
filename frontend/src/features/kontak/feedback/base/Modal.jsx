import { useEffect } from "react";

export default function Modal({
    open,
    title,
    children,
    onClose,
    footer,
    variant = "neutral", // "success" | "error" | "neutral"
}) {
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };

        document.addEventListener("keydown", onKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    const ring =
        variant === "success"
            ? "ring-emerald-200/60"
            : variant === "error"
                ? "ring-red-200/60"
                : "ring-neutral-200/60";

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog"}
        >
            {/* overlay click => onClose (anggap cancel) */}
            <button
                type="button"
                aria-label="Tutup dialog"
                onClick={onClose}
                className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            />

            <div
                className={[
                    "relative mx-4 w-full max-w-[520px]",
                    "rounded-[22px] bg-white",
                    "shadow-[0_22px_80px_rgba(0,0,0,0.28)]",
                    "ring-1",
                    ring,
                    "animate-[kontakModalIn_180ms_ease-out]",
                ].join(" ")}
            >
                {/* X => onClose (anggap cancel) */}
                <button
                    type="button"
                    onClick={onClose}
                    className={[
                        "absolute right-4 top-4",
                        "h-10 w-10 rounded-xl",
                        "border border-neutral-200",
                        "bg-white",
                        "shadow-sm",
                        "transition",
                        "hover:bg-neutral-50 hover:shadow-md",
                        "active:scale-[0.98]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                    ].join(" ")}
                    aria-label="Tutup"
                >
                    <span className="text-[18px] leading-none font-semibold">×</span>
                </button>

                <div className="px-6 pt-7 pb-5 sm:px-7">
                    {title ? (
                        <h3 className="text-[18px] sm:text-[20px] font-extrabold text-neutral-900">
                            {title}
                        </h3>
                    ) : null}

                    <div className="mt-4">{children}</div>
                </div>

                {footer ? <div className="px-6 pb-6 sm:px-7">{footer}</div> : null}
            </div>

            <style>{`
        @keyframes kontakModalIn {
          from { transform: translateY(6px) scale(0.98); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}