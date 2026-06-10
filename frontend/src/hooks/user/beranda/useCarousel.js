import { useCallback, useEffect, useMemo, useState } from "react";

export default function useCarousel({ total = 0, itemsPerPage = 1 } = {}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // maxIndex = total - itemsPerPage (tidak boleh negatif)
    const maxIndex = useMemo(() => Math.max(0, total - itemsPerPage), [total, itemsPerPage]);

    // kalau itemsPerPage berubah (resize), pastikan index tidak keluar batas
    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const canPrev = currentIndex > 0;
    const canNext = currentIndex < maxIndex;

    const handlePrev = useCallback(() => {
        if (!canPrev) return;
        setCurrentIndex((prev) => prev - 1);
    }, [canPrev]);

    const handleNext = useCallback(() => {
        if (!canNext) return;
        setCurrentIndex((prev) => prev + 1);
    }, [canNext]);

    return { currentIndex, maxIndex, canPrev, canNext, handlePrev, handleNext };
}