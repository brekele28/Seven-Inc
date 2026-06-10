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

const STATUS_SLUG_MAP = {
    "lamaran-baru": "submitted",
    baru: "submitted",
    submitted: "submitted",

    seleksi: "screening",
    screening: "screening",
    "seleksi-administrasi": "screening",

    interview: "interview",

    diterima: "accepted",
    accepted: "accepted",

    ditolak: "rejected",
    rejected: "rejected",

    expired: "expired",
};

function getStatusObject(item) {
    if (item.status && typeof item.status === "object") return item.status;
    if (item.status_lamaran && typeof item.status_lamaran === "object") {
        return item.status_lamaran;
    }
    if (item.statusLamaran && typeof item.statusLamaran === "object") {
        return item.statusLamaran;
    }

    return {};
}

function getStatusKey(item) {
    const statusObject = getStatusObject(item);

    const raw = toText(
        statusObject.slug ||
            statusObject.kode ||
            item.status_key ||
            item.status_slug ||
            item.status
    )
        .trim()
        .toLowerCase();

    return STATUS_SLUG_MAP[raw] || raw || "submitted";
}

function getStatusLabel(item) {
    const statusObject = getStatusObject(item);

    return (
        toText(
            statusObject.nama_status ||
                statusObject.label ||
                item.status_label ||
                item.statusLabel
        ).trim() || "Lamaran Baru"
    );
}

function getTimeline(item) {
    const status = getStatusKey(item);

    const tanggalLamaran = item.tanggal_lamaran || item.created_at;
    const tanggalReview = item.tanggal_review || item.updated_at;
    const interview = item.interview || null;

    const screeningDone = ["screening", "interview", "accepted", "rejected"].includes(status);
    const interviewDone = ["interview", "accepted"].includes(status);

    return [
        {
            key: "submitted",
            title: "Lamaran Terkirim",
            description: "Lamaran berhasil masuk ke sistem.",
            status: "done",
            dateLabel: formatDateLabel(tanggalLamaran),
        },
        {
            key: "screening",
            title: "Seleksi Administrasi",
            description:
                status === "submitted"
                    ? "Tim kami sedang meninjau kelengkapan dokumen."
                    : "Dokumen sudah masuk tahap seleksi administrasi.",
            status: screeningDone ? "done" : "pending",
            dateLabel: screeningDone ? formatDateLabel(tanggalReview) : "-",
        },
        {
            key: "interview",
            title: "Undangan Interview",
            description:
                interviewDone
                    ? "Kamu mendapatkan undangan interview."
                    : "Jika lolos seleksi, kamu akan dihubungi untuk interview.",
            status: interviewDone ? "done" : "pending",
            dateLabel: interview?.tanggal_interview
                ? formatDateLabel(interview.tanggal_interview)
                : "-",
            note: interview
                ? `${interview.lokasi || "-"}${
                      interview.jam_mulai ? `, ${interview.jam_mulai}` : ""
                  }`
                : "Pastikan nomor WhatsApp aktif.",
        },
        {
            key: "final",
            title: "Keputusan Akhir",
            description:
                status === "accepted"
                    ? "Selamat, kamu dinyatakan diterima."
                    : status === "rejected"
                      ? "Lamaran belum berhasil pada proses rekrutmen ini."
                      : status === "expired"
                        ? "Lamaran melewati batas waktu seleksi otomatis."
                        : "Hasil akhir proses rekrutmen akan ditampilkan di tahap ini.",
            status:
                status === "accepted"
                    ? "done"
                    : status === "rejected"
                      ? "failed"
                      : status === "expired"
                        ? "expired"
                        : "pending",
            dateLabel: ["accepted", "rejected", "expired"].includes(status)
                ? formatDateLabel(tanggalReview)
                : "-",
            note:
                status === "accepted"
                    ? "Data penerimaan tersimpan di sistem."
                    : status === "rejected"
                      ? "Tetap semangat dan coba kesempatan berikutnya."
                      : status === "expired"
                        ? "Status berubah otomatis karena melewati batas anti-ghosting."
                        : "Keputusan akhir dapat berupa diterima, belum berhasil, atau expired otomatis.",
        },
    ];
}

export function normalizeStatusLamaran(item) {
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

        status: getStatusKey(item),
        statusLabel: getStatusLabel(item),

        updatedAt: item.tanggal_review || item.updated_at || item.tanggal_lamaran,
        updatedAtLabel: formatDateLabel(
            item.tanggal_review || item.updated_at || item.tanggal_lamaran
        ),

        timeline: getTimeline(item),
    };
}

export async function getStatusLamaran(kodeLamaran) {
    const data = await findLamaranByKode(kodeLamaran);
    return normalizeStatusLamaran(data);
}

export async function getStatusesByPhone(phone) {
    const list = await findLamaranByPhone(phone);

    return Array.isArray(list)
        ? list.map(normalizeStatusLamaran).filter(Boolean)
        : [];
}

export { normalizePhone };