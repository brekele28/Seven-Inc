import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";

export default function Sidebar({
    isOpen,
    onClose,
    menus = [],
}) {
    const location = useLocation();
    const pathname = location.pathname;

    const [openGroups, setOpenGroups] = useState({});

    const toggleGroup = (label) => {
        setOpenGroups((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <>
            {/* Overlay mobile */}
            <button
                type="button"
                aria-label="Tutup sidebar"
                onClick={onClose}
                className={[
                    "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                ].join(" ")}
            />

            <aside
                className={[
                    "fixed left-0 top-0 z-50 h-screen w-72",
                    "bg-white border-r border-neutral-200 shadow-sm",
                    "transition-transform duration-300 ease-in-out",
                    "lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
                aria-label="Sidebar admin"
            >
                {/* Logo Area */}
                <div className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
                    <NavLink
                        to="/admin/dashboard"
                        onClick={onClose}
                        aria-label="Ke dashboard admin"
                        className="inline-flex items-center"
                    >
                        <img
                            src="/assets/image/Logo/SevenInc.png"
                            alt="Seven Inc"
                            className="h-11 w-auto object-contain"
                        />
                    </NavLink>

                    <button
                        type="button"
                        aria-label="Tutup menu admin"
                        onClick={onClose}
                        className="rounded-xl p-2 text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Menu List */}
                <nav className="h-[calc(100vh-5rem)] overflow-y-auto px-4 py-6">
                    <ul className="space-y-2">
                        {menus.map((menu) => {
                            const Icon = menu.icon;
                            const hasChildren = Boolean(menu.children?.length);

                            if (hasChildren) {
                                const isGroupActive = menu.children.some((child) =>
                                    pathname.startsWith(child.path)
                                );

                                const isGroupOpen =
                                    Boolean(openGroups[menu.label]) || isGroupActive;

                                const groupButtonClass = isGroupActive
                                    ? "bg-red-50 text-red-700 shadow-sm"
                                    : isGroupOpen
                                      ? "bg-neutral-50 text-neutral-900 shadow-sm ring-1 ring-neutral-200"
                                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900";

                                return (
                                    <li key={menu.label}>
                                        <button
                                            type="button"
                                            onClick={() => toggleGroup(menu.label)}
                                            aria-expanded={isGroupOpen}
                                            aria-controls={`submenu-${menu.label}`}
                                            className={[
                                                "flex w-full items-center gap-3 rounded-xl px-4 py-3",
                                                "text-sm font-semibold transition-all",
                                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                                                groupButtonClass,
                                            ].join(" ")}
                                        >
                                            {Icon && <Icon className="h-5 w-5 shrink-0" />}

                                            <span className="flex-1 text-left">
                                                {menu.label}
                                            </span>

                                            <ChevronDown
                                                className={[
                                                    "h-4 w-4 shrink-0 transition-transform duration-300",
                                                    isGroupOpen ? "rotate-180" : "rotate-0",
                                                ].join(" ")}
                                            />
                                        </button>

                                        <div
                                            id={`submenu-${menu.label}`}
                                            className={[
                                                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
                                                isGroupOpen
                                                    ? "grid-rows-[1fr] opacity-100"
                                                    : "grid-rows-[0fr] opacity-0",
                                            ].join(" ")}
                                        >
                                            <div className="min-h-0">
                                                <ul className="mt-2 space-y-1 border-l border-red-100 pl-4">
                                                    {menu.children.map((child) => {
                                                        const ChildIcon = child.icon;

                                                        return (
                                                            <li key={child.path}>
                                                                <NavLink
                                                                    to={child.path}
                                                                    end={child.end}
                                                                    onClick={onClose}
                                                                    className={({ isActive }) =>
                                                                        [
                                                                            "flex items-center gap-3 rounded-xl px-4 py-2.5",
                                                                            "text-sm font-semibold transition-all",
                                                                            isActive
                                                                                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                                                                : "text-neutral-600 hover:bg-red-50 hover:text-red-700",
                                                                        ].join(" ")
                                                                    }
                                                                >
                                                                    {ChildIcon && (
                                                                        <ChildIcon className="h-4 w-4 shrink-0" />
                                                                    )}
                                                                    <span>{child.label}</span>
                                                                </NavLink>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }

                            return (
                                <li key={menu.path}>
                                    <NavLink
                                        to={menu.path}
                                        end={menu.end}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            [
                                                "flex items-center gap-3 rounded-xl px-4 py-3",
                                                "text-sm font-semibold transition-all",
                                                isActive
                                                    ? "bg-red-50 text-red-700 shadow-sm"
                                                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
                                            ].join(" ")
                                        }
                                    >
                                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                                        <span>{menu.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}