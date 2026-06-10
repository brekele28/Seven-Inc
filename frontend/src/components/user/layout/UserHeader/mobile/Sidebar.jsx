import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

export default function Sidebar({
    isOpen,
    onClose,
    title = "Menu",
    children,
}) {

    const portalTarget = useMemo(() => {
        if (typeof document === "undefined") return null;
        return document.body;
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const onResize = () => {
            if (window.innerWidth >= 768) onClose?.();
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [isOpen, onClose]);

    if (!portalTarget) return null;

    return createPortal(
        <div
            className={[
                "md:hidden",
                "fixed inset-0 z-9998",
                isOpen ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            aria-hidden={!isOpen}
        >
            {/* Overlay */}
            <button
                type="button"
                aria-label="Tutup menu"
                onClick={onClose}
                className={[
                    "absolute inset-0",
                    "bg-black/35",
                    "transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0",
                ].join(" ")}
            />

            {/* Panel */}
            <aside
                className={[
                    "absolute right-0 top-0 h-full w-[86%] max-w-90",
                    "bg-white",
                    "shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
                    "border-l border-neutral-200/70",
                    "transition-transform duration-300 ease-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                    "flex flex-col",
                ].join(" ")}
                role="dialog"
                aria-modal="true"
                aria-label="Navigasi mobile"
            >
                {/* Header panel */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/70">
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold tracking-[0.35em] text-neutral-500 uppercase">
                            Navigasi
                        </p>
                        <h2 className="mt-1 text-[18px] font-extrabold text-neutral-900">
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className={[
                            "h-10 w-10 rounded-xl",
                            "border border-neutral-200",
                            "bg-white",
                            "shadow-sm",
                            "transition-all duration-200",
                            "hover:bg-neutral-50 hover:shadow-md",
                            "active:scale-[0.98]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                        ].join(" ")}
                        aria-label="Tutup sidebar"
                    >
                        <span className="text-[18px] leading-none font-semibold">×</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                    {children}
                </div>

                {/* Footer panel */}
                <div className="px-5 py-4 border-t border-neutral-200/70">
                    <p className="text-[12px] text-neutral-500">
                        Seven INC. • Company Profile
                    </p>
                </div>
            </aside>
        </div>,
        portalTarget
    );
}