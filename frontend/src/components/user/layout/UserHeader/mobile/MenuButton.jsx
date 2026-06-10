import { Menu, X } from "lucide-react";

export default function MenuButton({ isOpen, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            className={[
                "inline-flex items-center justify-center",
                "h-11 w-11 rounded-xl",
                "border border-neutral-200",
                "bg-white/80 backdrop-blur",
                "shadow-sm",
                "transition-all duration-200",
                "hover:shadow-md hover:-translate-y-[1px]",
                "active:translate-y-0 active:shadow-sm",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
            ].join(" ")}
        >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
    );
}