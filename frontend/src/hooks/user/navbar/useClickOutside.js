import { useEffect } from "react";

export default function useClickOutside(ref, onOutside, enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        function onDocMouseDown(e) {
            if (!ref?.current) return;
            if (!ref.current.contains(e.target)) onOutside?.();
        }

        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [ref, onOutside, enabled]);
}