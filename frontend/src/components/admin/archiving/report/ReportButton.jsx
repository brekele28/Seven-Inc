import { FileDown } from "lucide-react";

export default function ReportButton({ onClick, label = "Export PDF" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "inline-flex items-center justify-center gap-2",
                "rounded-full border border-neutral-200 bg-white px-4 py-2.5",
                "text-[12px] font-extrabold text-neutral-700",
                "shadow-sm transition hover:bg-neutral-50 active:scale-[0.98]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
            ].join(" ")}
        >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            {label}
        </button>
    );
}