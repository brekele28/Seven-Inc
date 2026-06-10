import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import KarirMenu from "./KarirMenu";

export default function DesktopNav({
    linkBase,
    activeClass,
    delayedNavigate,
    wrapperRef,
    openKarir,
    setOpenKarir,
}) {
    return (
        <nav className="hidden md:flex ml-auto items-center justify-end gap-12">
            <NavLinks
                linkBase={linkBase}
                activeClass={activeClass}
                delayedNavigate={delayedNavigate}
            />

            <KarirMenu
                wrapperRef={wrapperRef}
                linkBase={linkBase}
                openKarir={openKarir}
                setOpenKarir={setOpenKarir}
                delayedNavigate={delayedNavigate}
            />

            <NavLink
                to="/kontak"
                onClick={(e) => {
                    e.preventDefault();
                    delayedNavigate("/kontak");
                }}
                className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
            >
                Kontak
            </NavLink>
        </nav>
    );
}