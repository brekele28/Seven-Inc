import { ChevronLeft, ChevronRight } from "lucide-react";
import { clamp, getCarouselPages } from "../../../../../hooks/user/berita/usePagination";

export default function Pagination({
    currentPage = 1,
    totalPages = 3,
    onPageChange = () => { },
    className = "",
}) {
    const safeCurrent = clamp(currentPage, 1, Math.max(1, totalPages));
    const canPrev = safeCurrent > 1;
    const canNext = safeCurrent < totalPages;

    const pages = getCarouselPages(safeCurrent, totalPages, 3);

    const goTo = (p) => {
        const next = clamp(p, 1, totalPages);
        if (next !== safeCurrent) onPageChange(next);
    };

    return (
        <div className={`w-full flex items-center justify-center ${className}`}>
            {/* Wrapper */}
            <div
                className={[
                    "relative inline-flex items-center gap-2",
                    "rounded-2xl px-2.5 py-2",
                    "bg-white/80 backdrop-blur",
                    "border border-slate-200/70",
                    "shadow-[0_10px_30px_-15px_rgba(15,23,42,0.25)]",
                ].join(" ")}
            >
                {/* Soft glow */}
                <div
                    className="pointer-events-none absolute -inset-0.5 rounded-[18px] opacity-60 blur-xl"
                    style={{
                        background:
                            "radial-gradient(60% 80% at 50% 10%, rgba(239,68,68,0.18) 0%, rgba(59,130,246,0.10) 35%, rgba(255,255,255,0) 70%)",
                    }}
                />

                {/* Prev */}
                <button
                    type="button"
                    onClick={() => goTo(safeCurrent - 1)}
                    disabled={!canPrev}
                    className={[
                        "relative inline-flex items-center justify-center",
                        "h-10 w-10 rounded-xl",
                        "border border-slate-200/70 bg-white",
                        "shadow-sm",
                        "transition-all duration-200",
                        "hover:-translate-y-0.5 hover:shadow-md",
                        "active:translate-y-0 active:shadow-sm",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2",
                        !canPrev
                            ? "opacity-45 cursor-not-allowed hover:translate-y-0 hover:shadow-sm"
                            : "text-slate-700 hover:text-slate-900 cursor-pointer",
                    ].join(" ")}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Pages */}
                <div className="relative inline-flex items-center gap-1 px-0.5">
                    {pages.map((page) => {
                        const isActive = page === safeCurrent;

                        return (
                            <button
                                key={page}
                                type="button"
                                onClick={() => goTo(page)}
                                className={[
                                    "relative inline-flex items-center justify-center",
                                    "h-10 min-w-10 px-3 rounded-xl",
                                    "transition-all duration-200",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2",
                                    isActive
                                        ? ["text-white", "shadow-[0_12px_28px_-18px_rgba(239,68,68,0.55)]"].join(" ")
                                        : [
                                            "text-slate-600",
                                            "hover:text-slate-900",
                                            "hover:-translate-y-0.5",
                                            "active:translate-y-0",
                                        ].join(" "),
                                ].join(" ")}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {/* Active gradient pill */}
                                {isActive && (
                                    <span
                                        className="absolute inset-0 rounded-xl"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(239,68,68,1) 0%, rgba(244,63,94,1) 35%, rgba(59,130,246,1) 120%)",
                                        }}
                                    />
                                )}

                                {/* Subtle hover background for inactive */}
                                {!isActive && (
                                    <span className="absolute inset-0 rounded-xl bg-slate-50 opacity-0 hover:opacity-100 transition-opacity duration-200" />
                                )}

                                {/* Inner border highlight */}
                                <span
                                    className={[
                                        "absolute inset-0 rounded-xl",
                                        isActive ? "ring-1 ring-white/25" : "ring-1 ring-slate-200/70",
                                    ].join(" ")}
                                />

                                <span className="relative text-sm font-semibold tabular-nums">{page}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    type="button"
                    onClick={() => goTo(safeCurrent + 1)}
                    disabled={!canNext}
                    className={[
                        "relative inline-flex items-center justify-center",
                        "h-10 w-10 rounded-xl",
                        "border border-slate-200/70 bg-white",
                        "shadow-sm",
                        "transition-all duration-200",
                        "hover:-translate-y-0.5 hover:shadow-md",
                        "active:translate-y-0 active:shadow-sm",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2",
                        !canNext
                            ? "opacity-45 cursor-not-allowed hover:translate-y-0 hover:shadow-sm"
                            : "text-slate-700 hover:text-slate-900 cursor-pointer",
                    ].join(" ")}
                    aria-label="Next page"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}