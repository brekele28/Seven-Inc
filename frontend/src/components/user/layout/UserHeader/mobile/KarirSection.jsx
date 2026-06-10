import { ChevronDown } from "lucide-react";
import NavItem from "./NavItem";

export default function KarirSection({
    isOpen,
    onToggle,
    onNavigate,
    isLoading,
    pathname,
}) {
    const isActiveGroup =
        pathname === "/internship" ||
        pathname === "/lowongan-kerja" ||
        pathname === "/cek-lamaran";

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={onToggle}
                disabled={isLoading}
                className={[
                    "w-full flex items-center justify-between",
                    "px-4 py-3 rounded-xl",
                    "border",
                    "transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                    isActiveGroup
                        ? "border-red-200 bg-red-50 text-red-700 shadow-sm"
                        : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300",
                    isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
                aria-expanded={isOpen}
                aria-label="Toggle menu karir"
            >
                <span className="text-[14px] font-semibold">Karir</span>
                <ChevronDown
                    className={[
                        "h-5 w-5 transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                />
            </button>

            {/* Submenu */}
            <div
                className={[
                    "grid overflow-hidden transition-[grid-template-rows,opacity] duration-250 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
            >
                <div className="min-h-0">
                    <div className="pl-3 pr-1 py-1 space-y-2">
                        <NavItem
                            label="Internship"
                            isActive={pathname === "/internship"}
                            onClick={() => onNavigate("/internship")}
                        />
                        <NavItem
                            label="Lowongan Kerja"
                            isActive={pathname === "/lowongan-kerja"}
                            onClick={() => onNavigate("/lowongan-kerja")}
                        />
                        <NavItem
                            label="Cek Lamaran"
                            isActive={pathname === "/cek-lamaran"}
                            onClick={() => onNavigate("/cek-lamaran")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}