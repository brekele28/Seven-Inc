import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewsControls({ canPrev, canNext, onPrev, onNext }) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={onPrev}
                disabled={!canPrev}
                aria-label="Sebelumnya"
                className={`
          inline-flex h-11 w-11 items-center justify-center rounded-full border
          transition duration-300 ease-in-out
          ${canPrev
                        ? "border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 active:scale-95"
                        : "border-red-100 text-red-200 cursor-not-allowed"
                    }
        `}
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <button
                type="button"
                onClick={onNext}
                disabled={!canNext}
                aria-label="Berikutnya"
                className={`
          inline-flex h-11 w-11 items-center justify-center rounded-full border
          transition duration-300 ease-in-out
          ${canNext
                        ? "border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 active:scale-95"
                        : "border-red-100 text-red-200 cursor-not-allowed"
                    }
        `}
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}