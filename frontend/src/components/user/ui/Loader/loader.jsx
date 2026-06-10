export default function Loader() {
    return (
        <div
            className="
        fixed inset-0 z-9999
        flex items-center justify-center
        bg-white
      "
            role="status"
            aria-live="polite"
            aria-label="Memuat halaman"
        >
            <div className="flex flex-col items-center">
                {/* Ring luar */}
                <div className="relative h-16 w-16">
                    {/* Ring base (lebih soft) */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200/80" />

                    {/* Ring spin (gradient) */}
                    <div
                        className="absolute inset-0 rounded-full animate-spin"
                        style={{
                            background:
                                "conic-gradient(from 90deg, rgba(34,211,238,0.95), rgba(59,130,246,0.95), rgba(139,92,246,0.95), rgba(34,211,238,0.95))",
                            WebkitMask:
                                "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
                            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
                        }}
                    />

                    {/* Dot tengah (pulse) */}
                    <div className="absolute inset-0 grid place-items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-sky-500/90 animate-pulse" />
                    </div>
                </div>

                {/* Text */}
                <div className="mt-5 text-center">
                    <p className="text-sm font-semibold tracking-wide text-slate-900">
                        Memuat halaman…
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        Mohon tunggu sebentar
                    </p>
                </div>

                {/* Dots */}
                <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400/55 animate-bounce [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-sky-400/75 animate-bounce [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 rounded-full bg-sky-400/95 animate-bounce" />
                </div>
            </div>
        </div>
    );
}