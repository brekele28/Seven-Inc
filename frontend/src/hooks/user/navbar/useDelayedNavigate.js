import { useCallback, useEffect, useRef, useState } from "react";

export default function useDelayedNavigate({
    navigate,
    currentPath = "",
    delayMs = 1500,
    scrollBehavior = "auto",
} = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const delayedNavigate = useCallback(
        (to) => {
            if (!navigate) return;
            if (isLoading) return;

            // kalau route sama, tidak usah loader
            if (to === currentPath) return;

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            setIsLoading(true);

            timeoutRef.current = setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior });
                navigate(to);
                setIsLoading(false);
            }, delayMs);
        },
        [navigate, isLoading, currentPath, delayMs, scrollBehavior]
    );

    return { isLoading, delayedNavigate };
}