import { ChevronLeft, ChevronRight } from "lucide-react";

function NavButton({ label, onClick, disabled, children }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            className={[
                "h-11 w-11 rounded-full border flex items-center justify-center transition",
                "focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer",
                disabled
                    ? "border-red-200 text-red-200 cursor-not-allowed"
                    : "border-red-300 text-red-500 hover:bg-red-50 active:scale-95",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

export default function PrinsipNav({ canPrev, canNext, onPrev, onNext }) {
    return (
        <div className="mt-8 flex items-center gap-4">
            <NavButton label="Sebelumnya" onClick={onPrev} disabled={!canPrev}>
                <ChevronLeft className="h-5 w-5" />
            </NavButton>

            <NavButton label="Berikutnya" onClick={onNext} disabled={!canNext}>
                <ChevronRight className="h-5 w-5" />
            </NavButton>
        </div>
    );
}