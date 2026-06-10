// Ini cuma data contoh (dummy). Nanti kalau data sudah dari API, file ini boleh tidak dipakai.

export const DUMMY_NEWS_ITEMS = (() => {
    const NEWS_TOTAL_ITEMS = 54;
    const NEWS_PAGE_SIZE = 9;

    return Array.from({ length: NEWS_TOTAL_ITEMS }).map((_, idx) => {
        const id = idx + 1;
        const imgIndex = (idx % 3) + 1;
        const pageIndex = Math.floor(idx / NEWS_PAGE_SIZE);
        const year = 2025 + pageIndex;

        const n = id;
        const title =
            n % 3 === 1
                ? "Integritas dan Disiplin, Dua Pilar Penting Pembentukan SDM Berkualitas di Seven INC."
                : n % 3 === 2
                    ? "Kolaborasi Tim yang Sehat untuk Mendorong Produktivitas dan Inovasi Berkelanjutan"
                    : "Transformasi Digital untuk Mendukung Pertumbuhan Bisnis di Era Modern";

        return {
            id,
            date: `28 Jul ${year}`,
            title,
            imageSrc: `/assets/image/Beranda/Berita/News${imgIndex}.png`,
        };
    });
})();