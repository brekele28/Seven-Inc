import { ArrowRight } from "lucide-react";

export default function FeaturedAction() {
    return (
        <button
            type="button"
            className="
        mt-20
        inline-flex items-center gap-2
        text-[13px] font-semibold
        text-red-500
        transition-colors
        hover:text-red-600
      "
        >
            Lebih Lanjut
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
    );
}