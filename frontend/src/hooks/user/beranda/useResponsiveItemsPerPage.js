import { useEffect, useState } from "react";

export default function useResponsiveItemsPerPage({
    mobile = 1,
    desktop = 3,
    breakpointPx = 768,
} = {}) {
    const [itemsPerPage, setItemsPerPage] = useState(desktop);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < breakpointPx) setItemsPerPage(mobile);
            else setItemsPerPage(desktop);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [mobile, desktop, breakpointPx]);

    return itemsPerPage;
}