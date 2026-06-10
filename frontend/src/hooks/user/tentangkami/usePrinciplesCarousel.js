import { useMemo, useState } from "react";

export default function usePrinciplesCarousel(principles = []) {
    const [activeIndex, setActiveIndex] = useState(0);

    const lastIndex = useMemo(() => {
        if (!Array.isArray(principles) || principles.length === 0) return 0;
        const lengths = principles.map((p) => (Array.isArray(p?.descriptions) ? p.descriptions.length : 0));
        const minLen = Math.min(...lengths);
        return Math.max(0, minLen - 1);
    }, [principles]);

    const canPrev = activeIndex > 0;
    const canNext = activeIndex < lastIndex;

    const handlePrev = () => {
        if (!canPrev) return;
        setActiveIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (!canNext) return;
        setActiveIndex((prev) => prev + 1);
    };

    return { activeIndex, lastIndex, canPrev, canNext, handlePrev, handleNext };
}