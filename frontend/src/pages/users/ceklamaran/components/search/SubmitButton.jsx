import { ArrowRight, Search } from "lucide-react";
import { CEK_LAMARAN_UI } from "../../../../../services/user/ceklamaran/data/ceklamaran.ui.dummy";

export default function SubmitButton() {
    return (
        <button
            type="submit"
            className={[
                "group inline-flex h-14 w-full items-center justify-center gap-3",
                "rounded-2xl bg-red-500 px-6",
                "text-[13px] font-extrabold text-white",
                "shadow-[0_18px_35px_-16px_rgba(239,68,68,0.85)]",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_22px_40px_-18px_rgba(239,68,68,0.9)]",
                "active:translate-y-0 active:scale-[0.99]",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400/30",
            ].join(" ")}
        >
            {/* <Search className="h-4 w-4" aria-hidden="true" /> */}
            {CEK_LAMARAN_UI.submitLabel}
            <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
            />
        </button>
    );
}