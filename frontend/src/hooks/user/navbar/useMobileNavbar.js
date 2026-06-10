import { useEffect, useCallback, useRef, useState } from "react";

export default function useMobileNavbar({ pathname } = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isKarirOpen, setIsKarirOpen] = useState(false);

    const prevPathRef = useRef(null);
    const isFirstRenderRef = useRef(true);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => {
        setIsOpen(false);
        setIsKarirOpen(false);
    }, []);

    const toggle = useCallback(() => setIsOpen((v) => !v), []);
    const toggleKarir = useCallback(() => setIsKarirOpen((v) => !v), []);

    
    useEffect(() => {
        if (!pathname) return;

        // Skip mount pertama
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            prevPathRef.current = pathname;
            return;
        }

        // Hanya jika benar-benar berubah
        if (prevPathRef.current === pathname) return;
        prevPathRef.current = pathname;

        // Jika sidebar / karir sedang terbuka, tutup secara async (lint aman)
        if (isOpen || isKarirOpen) {
            const t = setTimeout(() => close(), 0);
            return () => clearTimeout(t);
        }
    }, [pathname, close, isOpen, isKarirOpen]);

    // ESC handler
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, close]);

    // Lock scroll body saat sidebar open
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    return {
        isOpen,
        isKarirOpen,
        open,
        close,
        toggle,
        toggleKarir,
        setIsOpen,
        setIsKarirOpen,
    };
}