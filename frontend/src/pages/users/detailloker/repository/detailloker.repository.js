import { getPublicLowonganDetail } from "../../../../api/user/lowongan/LowonganApi";

function toSafeText(v) {
    if (v === undefined || v === null) return "";
    return String(v);
}

function toSafeStringArray(arr) {
    if (!Array.isArray(arr)) return [];

    return arr
        .map((item) => toSafeText(item).trim())
        .filter(Boolean);
}

function normalizeSections(sections) {
    if (!Array.isArray(sections)) return [];

    return sections
        .map((sec, idx) => {
            const id = toSafeText(sec?.id).trim() || `section-${idx + 1}`;
            const title = toSafeText(sec?.title).trim() || "SEKSI";
            const items = toSafeStringArray(sec?.items);

            return {
                id,
                title,
                items,
            };
        })
        .filter((section) => section.items.length > 0);
}

function normalizeDetail(data) {
    if (!data || typeof data !== "object") return null;

    const id = toSafeText(data.id || data.lowongan_id).trim();
    if (!id) return null;

    const title = toSafeText(
        data.judul_lowongan ||
            data.title ||
            data.nama_posisi ||
            data.posisi
    ).trim();

    return {
        id,
        lowongan_id: id,
        title,
        company: toSafeText(data.company).trim() || "Seven INC",
        meta: {
            position:
                toSafeText(data?.meta?.position || title).trim() || "-",
            location:
                toSafeText(data?.meta?.location || data.location || data.lokasi).trim() ||
                "-",
            closeDate:
                toSafeText(
                    data?.meta?.closeDate ||
                        data.tanggal_ditutup_label ||
                        data.tanggal_ditutup
                ).trim() || "-",
        },
        intro: toSafeText(data.intro || data.deskripsi).trim(),
        sections: normalizeSections(data.sections),
        note: "Hanya lamaran yang sesuai kualifikasi yang kami proses.",
        ctaText: "Daftar Sekarang",
    };
}

export async function getDetailLokerById(id) {
    const key = toSafeText(id).trim();

    if (!key) return null;

    const response = await getPublicLowonganDetail(key);

    return normalizeDetail(response?.data || response);
}