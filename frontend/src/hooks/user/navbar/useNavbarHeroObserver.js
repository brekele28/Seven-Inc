import { useEffect } from "react";

export default function useNavbarHeroObserver(pathname, setIsHeroActive) {
    useEffect(() => {
        const isHome = pathname === "/";
        const isBisnis = pathname === "/bisnis-kami";

        if (!isHome && !isBisnis) return;

        let targetEl = null;

        if (isHome) {
            targetEl = document.getElementById("home-hero");
        } else if (isBisnis) {
            const titleEl = document.getElementById("bisnis-hero-title");
            targetEl = titleEl?.closest("section") || titleEl;
        }

        if (!targetEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroActive(entry.isIntersecting);
            },
            { threshold: 0.15 }
        );

        observer.observe(targetEl);

        requestAnimationFrame(() => {
            const rect = targetEl.getBoundingClientRect();
            const viewportH = window.innerHeight || document.documentElement.clientHeight;
            const visible = rect.bottom > 0 && rect.top < viewportH;
            setIsHeroActive(visible);
        });

        return () => observer.disconnect();
    }, [pathname, setIsHeroActive]);
}