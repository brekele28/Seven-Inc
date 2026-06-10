import { useLocation, useNavigate } from "react-router";
import Container from "../../ui/Container/Container";
import Loader from "../../ui/Loader/loader";

import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
} from "lucide-react";

import useDelayedNavigate from "../../../../hooks/user/navbar/useDelayedNavigate";

function SocialIcon({ label, children, href = "#" }) {
    return (
        <a
            href={href}
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 text-white/90 hover:bg-white/10 transition-colors"
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </a>
    );
}

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentFull = `${location.pathname}${location.hash || ""}`;

    const nav = useDelayedNavigate({
        navigate,
        currentPath: currentFull,
        delayMs: 1500,
        scrollBehavior: "auto",
    });

    const goTo = (path) => {
        nav.delayedNavigate(path);
    };

    const goToBusiness = (targetId) => {
        nav.delayedNavigate(`/bisnis-kami#${targetId}`);
    };

    return (
        <>
            {nav.isLoading && <Loader />}

            <footer className="w-full bg-[#A9A9A9] text-white">
                <Container>
                    {/* baris atas: logo kiri + sosial kanan */}
                    <div className="flex items-start justify-between py-10">
                        <img
                            src="/assets/image/Logo/SevenInc.png"
                            alt="Seven Inc"
                            className="h-10 w-auto"
                        />

                        <div className="flex items-center gap-3">
                            <SocialIcon label="LinkedIn" href="#">
                                <Linkedin className="h-5 w-5" />
                            </SocialIcon>

                            <SocialIcon
                                label="Instagram"
                                href="https://www.instagram.com/sevenincjogja?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            >
                                <Instagram className="h-5 w-5" />
                            </SocialIcon>

                            <SocialIcon label="Facebook" href="#">
                                <Facebook className="h-5 w-5" />
                            </SocialIcon>

                            <SocialIcon label="Twitter" href="#">
                                <Twitter className="h-5 w-5" />
                            </SocialIcon>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/30" />

                    {/* isi footer */}
                    <div className="grid gap-10 py-10 md:grid-cols-4">
                        {/* Kantor Pusat */}
                        <div>
                            <h3 className="text-2xl font-extrabold">
                                Kantor Pusat
                            </h3>

                            <div className="mt-5 flex gap-3 text-sm leading-relaxed text-white/80">
                                <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/90" />

                                <p>
                                    Jl. Raya Janti Gg. Harjuna No.59, Jaranan,
                                    Karangjambe, Kec. Banguntapan, Kabupaten
                                    Bantul, Daerah Istimewa Yogyakarta 55198
                                </p>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h3 className="text-2xl font-extrabold">Links</h3>

                            <ul className="mt-5 space-y-3 text-sm text-white/80">
                                <li
                                    onClick={() => goTo("/")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Beranda
                                </li>

                                <li
                                    onClick={() => goTo("/tentang-kami")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Tentang Kami
                                </li>

                                <li
                                    onClick={() => goTo("/bisnis-kami")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Bisnis Kami
                                </li>

                                <li
                                    onClick={() => goTo("/berita")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Berita
                                </li>

                                <li
                                    onClick={() => goTo("/kontak")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Kontak
                                </li>
                            </ul>
                        </div>

                        {/* Bisnis Kami */}
                        <div>
                            <h3 className="text-2xl font-extrabold">
                                Bisnis Kami
                            </h3>

                            <ul className="mt-5 space-y-3 text-sm text-white/80">
                                <li
                                    onClick={() => goToBusiness("seven-tech")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Seven Tech
                                </li>

                                <li
                                    onClick={() => goToBusiness("seven-style")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Seven Style
                                </li>

                                <li
                                    onClick={() => goToBusiness("seven-edu")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Seven Edu
                                </li>

                                <li
                                    onClick={() => goToBusiness("seven-serve")}
                                    className="cursor-pointer transition-colors hover:text-white"
                                >
                                    Seven Serve
                                </li>
                            </ul>
                        </div>

                        {/* Hubungi */}
                        <div>
                            <h3 className="text-2xl font-extrabold">
                                Hubungi CS Kami
                            </h3>

                            <div className="mt-5 space-y-4 text-sm text-white/80">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 shrink-0 text-white/90" />
                                    <span>089633040200</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 shrink-0 text-white/90" />
                                    <span>sevenincjogja@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/30" />

                    <div className="py-8 text-center text-sm text-white/90">
                        Copyright @ 2025 Seven INC., All right reserved.
                    </div>
                </Container>
            </footer>
        </>
    );
}