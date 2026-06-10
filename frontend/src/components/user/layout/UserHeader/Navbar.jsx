import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "../../ui/Container/Container";
import Loader from "../../ui/Loader/loader";

import useMobileNavbar from "../../../../hooks/user/navbar/useMobileNavbar";
import useDelayedNavigate from "../../../../hooks/user/navbar/useDelayedNavigate";
import useClickOutside from "../../../../hooks/user/navbar/useClickOutside";
import useNavbarHeroObserver from "../../../../hooks/user/navbar/useNavbarHeroObserver";

import MenuButton from "./mobile/MenuButton";
import Sidebar from "./mobile/Sidebar";
import NavList from "./mobile/NavList";

import DesktopNav from "./desktop/DesktopNav";

const linkBase =
    "text-[15px] font-semibold tracking-wide text-neutral-900 hover:text-neutral-700 transition-colors";

const activeClass = "text-neutral-900";

export default function Navbar() {
    const [openKarir, setOpenKarir] = useState(false);
    const [isHeroActive, setIsHeroActive] = useState(false);

    // ✅ loader state
    const [isLoading, setIsLoading] = useState(false);

    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // untuk cancel timeout kalau user spam klik
    const navTimeoutRef = useRef(null);

    // Klik di luar area Karir (button + popover) => tutup popover
    useClickOutside(wrapperRef, () => setOpenKarir(false), true);

    // Observer hero (logic sama, hanya dipindah)
    useNavbarHeroObserver(location.pathname, setIsHeroActive);

    // ✅ Cleanup timeout kalau komponen unmount
    useEffect(() => {
        return () => {
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        };
    }, []);

    // ✅ Helper navigate + delay 1.5 detik + scroll to top
    const delayedNavigate = useCallback(
        (to, { closeKarir = false } = {}) => {
            // kalau sedang loading, abaikan klik baru
            if (isLoading) return;

            // kalau route sama, tidak usah loader
            if (to === location.pathname) {
                if (closeKarir) setOpenKarir(false);
                return;
            }

            if (closeKarir) setOpenKarir(false);

            // cancel timeout sebelumnya kalau ada
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);

            setIsLoading(true);

            navTimeoutRef.current = setTimeout(() => {
                // ✅ selalu mulai dari atas saat pindah halaman
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });

                navigate(to);

                // matikan loader setelah navigate dipanggil
                setIsLoading(false);
            }, 1500);
        },
        [isLoading, location.pathname, navigate]
    );

    // ✅ Glass hanya saat hero terlihat di "/" atau "/bisnis-kami"
    const showGlass =
        (location.pathname === "/" || location.pathname === "/bisnis-kami") && isHeroActive;

    const headerBg = showGlass
        ? "bg-white/35 backdrop-blur-md border-b border-white/25"
        : "bg-white border-b border-neutral-200";

    /**
     * =========================
     * MOBILE NAVBAR (Logic terpisah)
     * =========================
     */
    const mobile = useMobileNavbar({ pathname: location.pathname });

    // Untuk mobile: pakai hook reusable (biar sidebar bisa navigate tanpa nyentuh logic desktop)
    const mobileNav = useDelayedNavigate({
        navigate,
        currentPath: location.pathname,
        delayMs: 1500,
        scrollBehavior: "auto",
    });

    const handleMobileNavigate = useCallback(
        (to) => {
            // tutup sidebar dulu biar terasa cepat/rapi
            mobile.close();
            mobileNav.delayedNavigate(to);
        },
        [mobile, mobileNav]
    );

    return (
        <>
            {(isLoading || mobileNav.isLoading) && <Loader />}

            <header className={`fixed top-0 left-0 z-50 w-full ${headerBg}`}>
                <Container>
                    <div className="flex h-20 items-center">
                        {/* KIRI: Logo */}
                        <NavLink
                            to="/"
                            className="flex items-center shrink-0"
                            onClick={(e) => {
                                e.preventDefault();
                                delayedNavigate("/");
                            }}
                        >
                            <img
                                src="/assets/image/Logo/SevenInc.png"
                                alt="Seven Inc"
                                className="h-10 w-auto"
                            />
                        </NavLink>

                        {/* DESKTOP */}
                        <DesktopNav
                            linkBase={linkBase}
                            activeClass={activeClass}
                            delayedNavigate={delayedNavigate}
                            wrapperRef={wrapperRef}
                            openKarir={openKarir}
                            setOpenKarir={setOpenKarir}
                        />

                        {/* MOBILE (✅ tetap sama UI) */}
                        <div className="md:hidden ml-auto flex items-center gap-3">
                            <MenuButton isOpen={mobile.isOpen} onToggle={mobile.toggle} />

                            <Sidebar isOpen={mobile.isOpen} onClose={mobile.close} title="Seven INC">
                                <NavList
                                    pathname={location.pathname}
                                    onNavigate={handleMobileNavigate}
                                    isLoading={mobileNav.isLoading}
                                    isKarirOpen={mobile.isKarirOpen}
                                    onToggleKarir={mobile.toggleKarir}
                                />

                                {/* CTA kecil biar lebih modern */}
                                <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                                    <p className="text-[12px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                                        Kontak Cepat
                                    </p>
                                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">
                                        Punya pertanyaan atau ingin kerja sama? Hubungi tim Seven INC.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => handleMobileNavigate("/kontak")}
                                        className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.99] cursor-pointer"
                                    >
                                        Ke Halaman Kontak
                                    </button>
                                </div>
                            </Sidebar>
                        </div>
                    </div>
                </Container>
            </header>
        </>
    );
}