import { useEffect } from "react";

export default function useHashScroll(hash) {
    useEffect(() => {
        const id = hash?.replace("#", "");
        if (!id) return;

        const t = setTimeout(() => {
            const el = document.getElementById(id);
            if (!el) return;

            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 0);

        return () => clearTimeout(t);
    }, [hash]);
}