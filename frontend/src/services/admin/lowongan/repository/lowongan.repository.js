import {
    getAdminLowonganList,
    createAdminLowongan,
    updateAdminLowongan,
    publishAdminLowongan,
    closeAdminLowongan,
    deleteAdminLowongan,
} from "../../../../api/admin/lowongan/LowonganApi";

function toText(value) {
    if (value === undefined || value === null) return "";
    return String(value);
}

function toNumber(value, fallback = 0) {
    const number = Number(value);

    if (Number.isNaN(number)) return fallback;

    return number;
}

function normalizeSection(section, index = 0) {
    const rawItems = Array.isArray(section?.items) ? section.items : [];

    return {
        id: toText(section?.id).trim() || `section-${index + 1}`,
        title: toText(section?.title).trim() || "SEKSI",
        items: rawItems.map((item) => toText(item).trim()).filter(Boolean),
    };
}

function normalizeLowongan(item) {
    if (!item || typeof item !== "object") return null;

    const id = toText(item.id).trim();
    if (!id) return null;

    return {
        id,
        title: toText(item.title).trim(),
        company: toText(item.company).trim() || "Seven INC",
        location:
            toText(item.location).trim() ||
            "Bantul, Kabupaten Bantul, Daerah Istimewa Yogyakarta",
        openedAt: toText(item.openedAt).trim(),
        closedAt: toText(item.closedAt).trim(),
        status: toText(item.status).trim() || "draft",
        applicantCount: toNumber(
            item.applicantCount ??
                item.applicant_count ??
                item.lamaran_count ??
                item.total_pelamar ??
                item.totalPelamar,
            0
        ),
        intro: toText(item.intro).trim(),
        sections: Array.isArray(item.sections)
            ? item.sections
                  .map(normalizeSection)
                  .filter((section) => section.items.length > 0)
            : [],
    };
}

function normalizeList(data) {
    const list = Array.isArray(data) ? data : [];

    return list.map(normalizeLowongan).filter(Boolean);
}

export async function getLowonganList() {
    const response = await getAdminLowonganList();

    return normalizeList(response?.data);
}

export async function createLowongan(payload = {}) {
    const response = await createAdminLowongan(payload);

    return normalizeLowongan(response?.data);
}

export async function updateLowongan(id, payload = {}) {
    const response = await updateAdminLowongan(id, payload);

    return normalizeLowongan(response?.data);
}

export async function closeLowongan(id) {
    const response = await closeAdminLowongan(id);

    return normalizeLowongan(response?.data);
}

export async function publishLowongan(id) {
    const response = await publishAdminLowongan(id);

    return normalizeLowongan(response?.data);
}

export async function deleteLowongan(id) {
    await deleteAdminLowongan(id);

    return true;
}