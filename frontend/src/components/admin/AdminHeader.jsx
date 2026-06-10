import { useEffect, useRef, useState } from "react";
import {
    Menu,
    UserCircle,
    LogOut,
    Settings,
    ChevronDown,
} from "lucide-react";

export default function AdminHeader({
    title = "Dashboard",
    admin,
    onToggleSidebar,
    onLogout,
    onEditProfile,
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    const adminName = admin?.name ?? "";
    const adminEmail = admin?.email ?? "";

    useEffect(() => {
        function handleClickOutside(e) {
            if (!dropdownRef.current) return;

            if (!dropdownRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white px-5 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    aria-label="Buka sidebar admin"
                    onClick={onToggleSidebar}
                    className="rounded-xl border border-neutral-200 p-2 text-neutral-700 transition hover:bg-neutral-100 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div>
                    <h2 className="text-xl font-extrabold text-neutral-900">
                        {title}
                    </h2>
                </div>
            </div>

            <div ref={dropdownRef} className="relative">
                <button
                    type="button"
                    aria-label={`Buka menu ${adminName}`}
                    aria-haspopup="menu"
                    aria-expanded={isProfileOpen}
                    onClick={() => setIsProfileOpen((value) => !value)}
                    className={[
                        "inline-flex items-center gap-2 rounded-xl",
                        "border border-neutral-200 bg-white px-3 py-2",
                        "text-sm font-semibold text-neutral-800",
                        "shadow-sm transition-all",
                        "hover:bg-neutral-50 hover:shadow-md",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                    ].join(" ")}
                >
                    <UserCircle className="h-5 w-5 text-neutral-600" />

                    <span className="hidden max-w-40 truncate sm:inline">
                        {adminName}
                    </span>

                    <ChevronDown
                        className={[
                            "h-4 w-4 text-neutral-500 transition-transform duration-200",
                            isProfileOpen ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                    />
                </button>

                {isProfileOpen && (
                    <div
                        role="menu"
                        className={[
                            "absolute right-0 top-[calc(100%+10px)] z-50 w-64",
                            "overflow-hidden rounded-2xl border border-neutral-200 bg-white",
                            "shadow-xl shadow-black/10",
                        ].join(" ")}
                    >
                        <div className="border-b border-neutral-100 px-4 py-3">
                            <p className="truncate text-sm font-bold text-neutral-900">
                                {adminName}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-neutral-500">
                                {adminEmail}
                            </p>
                        </div>

                        <div className="p-2">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    onEditProfile?.();
                                }}
                                className={[
                                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
                                    "text-left text-sm font-semibold text-neutral-700",
                                    "transition hover:bg-neutral-100 hover:text-neutral-900",
                                ].join(" ")}
                            >
                                <Settings className="h-4 w-4" />
                                Edit Profil
                            </button>

                            <div className="my-2 h-px bg-neutral-100" />

                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    onLogout?.();
                                }}
                                className={[
                                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
                                    "text-left text-sm font-semibold text-red-600",
                                    "transition hover:bg-red-50",
                                ].join(" ")}
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}