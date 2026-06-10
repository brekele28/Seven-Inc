export default function Loader() {
    return (
        <div
            className="w-full py-8 flex items-center justify-center"
            role="status"
            aria-live="polite"
            aria-label="Memuat data lowongan"
        >
            <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70 animate-bounce [animation-delay:-0.2s]" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400/85 animate-bounce [animation-delay:-0.1s]" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500/80 animate-bounce" />
            </div>
        </div>
    );
}