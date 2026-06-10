export function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

export function getCarouselPages(currentPage, totalPages, windowSize = 3) {
    const w = Math.max(1, windowSize);

    if (totalPages <= w) {
        const all = [];
        for (let i = 1; i <= totalPages; i++) all.push(i);
        return all;
    }

    let start = currentPage - Math.floor(w / 2);
    let end = start + w - 1;

    if (start < 1) {
        start = 1;
        end = w;
    }
    if (end > totalPages) {
        end = totalPages;
        start = totalPages - w + 1;
    }

    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
}

export function getPageSlice(currentPage, pageSize) {
    const safePage = Math.max(1, currentPage);
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    return { safePage, start, end };
}