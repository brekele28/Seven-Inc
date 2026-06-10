// Ini "pintu utama" ambil data berita.
// Sekarang pakai dummy. Nanti kalau pakai API, kamu cukup ubah file ini saja.

import { DUMMY_NEWS_ITEMS } from "./newsDummy";

export const NEWS_PAGE_SIZE = 9;

/**
 * Ambil semua berita (untuk dummy).
 * Nanti kalau dinamis, biasanya kamu gak ambil semua sekaligus,
 * tapi untuk sekarang ini yang paling minim perubahan.
 */
export function getAllNews() {
    return DUMMY_NEWS_ITEMS;
}

/**
 * Ambil berita berdasarkan id
 */
export function getNewsById(id) {
    const numId = Number(id);
    if (!Number.isFinite(numId)) return DUMMY_NEWS_ITEMS[0];

    const found = DUMMY_NEWS_ITEMS.find((x) => x.id === numId);
    return found || DUMMY_NEWS_ITEMS[0];
}

/**
 * Hitung total halaman berdasarkan pageSize
 * (nanti kalau API, totalPages bisa dari response backend)
 */
export function getTotalPages(pageSize = NEWS_PAGE_SIZE) {
    const totalItems = DUMMY_NEWS_ITEMS.length;
    return Math.max(1, Math.ceil(totalItems / pageSize));
}