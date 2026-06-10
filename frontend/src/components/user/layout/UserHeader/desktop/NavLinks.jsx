import { NavLink } from "react-router-dom";

export default function NavLinks({ linkBase, activeClass, delayedNavigate }) {
    return (
        <>
            <NavLink
                to="/"
                onClick={(e) => {
                    e.preventDefault();
                    delayedNavigate("/");
                }}
                className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
            >
                Beranda
            </NavLink>

            <NavLink
                to="/tentang-kami"
                onClick={(e) => {
                    e.preventDefault();
                    delayedNavigate("/tentang-kami");
                }}
                className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
            >
                Tentang Kami
            </NavLink>

            <NavLink
                to="/bisnis-kami"
                onClick={(e) => {
                    e.preventDefault();
                    delayedNavigate("/bisnis-kami");
                }}
                className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
            >
                Bisnis Kami
            </NavLink>

            <NavLink
                to="/berita"
                onClick={(e) => {
                    e.preventDefault();
                    delayedNavigate("/berita");
                }}
                className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
            >
                Berita
            </NavLink>
        </>
    );
}