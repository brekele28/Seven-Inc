import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Kembali", onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        mt-3 inline-flex items-center gap-2
        rounded-full border border-neutral-200 bg-white px-4 py-2
        text-[12px] font-semibold text-neutral-700
        shadow-sm
        transition hover:bg-neutral-50 active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50
      "
        >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {label}
        </button>
    );
}