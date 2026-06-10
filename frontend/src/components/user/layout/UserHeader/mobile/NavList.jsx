import NavItem from "./NavItem";
import KarirSection from "./KarirSection";

export default function NavList({
    pathname,
    onNavigate,
    isLoading,
    isKarirOpen,
    onToggleKarir,
}) {
    return (
        <div className="space-y-3">
            <NavItem
                label="Beranda"
                isActive={pathname === "/"}
                onClick={() => onNavigate("/")}
            />

            <NavItem
                label="Tentang Kami"
                isActive={pathname === "/tentang-kami"}
                onClick={() => onNavigate("/tentang-kami")}
            />

            <NavItem
                label="Bisnis Kami"
                isActive={pathname === "/bisnis-kami"}
                onClick={() => onNavigate("/bisnis-kami")}
            />

            <NavItem
                label="Berita"
                isActive={pathname === "/berita"}
                onClick={() => onNavigate("/berita")}
            />

            <KarirSection
                pathname={pathname}
                isOpen={isKarirOpen}
                onToggle={onToggleKarir}
                onNavigate={onNavigate}
                isLoading={isLoading}
            />

            <NavItem
                label="Kontak"
                isActive={pathname === "/kontak"}
                onClick={() => onNavigate("/kontak")}
            />
        </div>
    );
}