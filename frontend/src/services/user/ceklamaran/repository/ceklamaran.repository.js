import {
    findLamaranByKode,
    findLamaranByPhone,
    normalizePhone,
} from "../../lamaran/repository/lamaran.repository";

function toText(value) {
    if (value === undefined || value === null) return "";
    return String(value);
}

function formatDateLabel(value) {
    if (!value) return "-";

    try {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return toText(value);
        }

        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    } catch {
        return toText(value);
    }
}

export function normalizeLamaranSearchItem(item) {
    if (!item || typeof item !== "object") return null;

    const pelamar = item.pelamar || {};
    const lowongan = item.lowongan || {};

    const applicationId = toText(
        item.kode_lamaran ||
            item.kodeLamaran ||
            item.applicationId ||
            item.id
    ).trim();

    if (!applicationId) return null;

    const phone = toText(
        pelamar.no_whatsapp ||
            pelamar.no_hp ||
            item.no_whatsapp ||
            item.no_hp ||
            item.phone
    ).trim();

    const jobTitle = toText(
        lowongan.judul_lowongan ||
            lowongan.nama_posisi ||
            lowongan.title ||
            item.judul_lowongan ||
            item.posisi ||
            item.jobTitle
    ).trim();

    return {
        ...item,
        id: applicationId,
        applicationId,
        kodeLamaran: applicationId,
        kode_lamaran: applicationId,

        fullName: toText(
            pelamar.nama_lengkap ||
                item.nama_lengkap ||
                item.fullName
        ).trim(),

        email: toText(pelamar.email || item.email).trim(),
        phone,
        phoneLabel: phone || "-",
        jobTitle: jobTitle || "-",

        updatedAt: item.tanggal_review || item.updated_at || item.tanggal_lamaran,
        updatedAtLabel: formatDateLabel(
            item.tanggal_review || item.updated_at || item.tanggal_lamaran
        ),
    };
}

export async function searchLamaranById(kodeLamaran) {
    const data = await findLamaranByKode(kodeLamaran);
    return normalizeLamaranSearchItem(data);
}

export async function searchLamaranByWhatsapp(phone) {
    const data = await findLamaranByPhone(phone);

    return Array.isArray(data)
        ? data.map(normalizeLamaranSearchItem).filter(Boolean)
        : [];
}

export { normalizePhone };