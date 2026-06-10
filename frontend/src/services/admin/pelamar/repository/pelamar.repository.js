import {
    acceptAdminPelamar,
    deleteAdminPelamar,
    expireAdminPelamar,
    getAdminPelamarDetail,
    getAdminPelamarList,
    rejectAdminPelamar,
    scheduleAdminPelamarInterview,
    updateAdminPelamarStatus,
} from "../../../../api/admin/pelamar/PelamarApi";

import { normalizeApiFileUrl } from "../../../../api/client/ApiClient";

export const PELAMAR_STATUS_OPTIONS = [
    { value: "process", label: "Perlu Diproses" },
    { value: "all", label: "Semua" },
    { value: "submitted", label: "Baru" },
    { value: "screening", label: "Seleksi" },
    { value: "interview", label: "Interview" },
    { value: "accepted", label: "Diterima" },
    { value: "rejected", label: "Ditolak" },
    { value: "expired", label: "Expired" },
];

const ARCHIVE_CACHE_KEY = "seveninc_admin_archive_cache";

const STATUS_SLUG_MAP = {
    "lamaran-baru": "submitted",
    baru: "submitted",
    submitted: "submitted",

    "seleksi-administrasi": "screening",
    seleksi: "screening",
    screening: "screening",

    interview: "interview",

    diterima: "accepted",
    accepted: "accepted",

    ditolak: "rejected",
    rejected: "rejected",

    expired: "expired",
};

const FRONTEND_TO_BACKEND_STATUS_SLUG = {
    submitted: "lamaran-baru",
    screening: "seleksi-administrasi",
    interview: "interview",
    accepted: "diterima",
    rejected: "ditolak",
    expired: "expired",
};

const statusLabelMap = {
    submitted: "Lamaran Baru",
    screening: "Seleksi Administrasi",
    interview: "Interview",
    accepted: "Diterima",
    rejected: "Ditolak",
    expired: "Expired",
};

function safeArray(value) {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.data)) return value.data;
    return [];
}

function toText(value) {
    if (value === undefined || value === null) return "";
    return String(value);
}

function readArchiveCache() {
    if (typeof window === "undefined") return {};

    try {
        const raw = localStorage.getItem(ARCHIVE_CACHE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function writeArchiveCache(cache) {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(ARCHIVE_CACHE_KEY, JSON.stringify(cache || {}));
    } catch {
        // Abaikan error localStorage agar request utama tetap aman.
    }
}

function saveArchiveCache(applicationId, data = {}) {
    const key = toText(applicationId).trim();

    if (!key) return;

    const cache = readArchiveCache();

    cache[key] = {
        ...(cache[key] || {}),
        ...data,
        cachedAt: new Date().toISOString(),
    };

    writeArchiveCache(cache);
}

function getArchiveCache(applicationId) {
    const key = toText(applicationId).trim();

    if (!key) return {};

    const cache = readArchiveCache();

    return cache[key] || {};
}

function unwrapResponse(response) {
    const data = response?.data || response?.lamaran || response?.pelamar || response;

    if (data?.lamaran) return data.lamaran;

    return data;
}

function unwrapListResponse(response) {
    const data =
        response?.data?.data ||
        response?.data ||
        response?.items ||
        response?.lamaran ||
        response?.pelamar ||
        response;

    return safeArray(data);
}

function unwrapActionParts(response) {
    const data = response?.data || response || {};

    return {
        lamaran: data?.lamaran || data,
        interview: data?.interview || null,
        penerimaan: data?.penerimaan || null,
    };
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

function diffDays(value) {
    if (!value) return null;

    const target = new Date(value);
    const today = new Date();

    if (Number.isNaN(target.getTime())) return null;

    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function getDeadlineMeta(item) {
    const daysLeft = Number.isFinite(Number(item.days_left))
        ? Number(item.days_left)
        : diffDays(item.batas_anti_ghosting || item.expiredAt);

    if (daysLeft === null) {
        return {
            daysLeft: null,
            deadlineLabel: "-",
            deadlineLevel: "safe",
        };
    }

    if (daysLeft < 0) {
        return {
            daysLeft,
            deadlineLabel: "Expired",
            deadlineLevel: "expired",
        };
    }

    if (daysLeft === 0) {
        return {
            daysLeft,
            deadlineLabel: "Hari ini",
            deadlineLevel: "danger",
        };
    }

    if (daysLeft === 1) {
        return {
            daysLeft,
            deadlineLabel: "Besok",
            deadlineLevel: "danger",
        };
    }

    if (daysLeft <= 3) {
        return {
            daysLeft,
            deadlineLabel: `${daysLeft} hari lagi`,
            deadlineLevel: "warning",
        };
    }

    return {
        daysLeft,
        deadlineLabel: `${daysLeft} hari lagi`,
        deadlineLevel: "safe",
    };
}

function getStatusObject(item) {
    if (item.status && typeof item.status === "object") return item.status;
    if (item.status_lamaran && typeof item.status_lamaran === "object") return item.status_lamaran;
    if (item.statusLamaran && typeof item.statusLamaran === "object") return item.statusLamaran;

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
    const status = getStatusKey(item);
    const statusObject = getStatusObject(item);

    return (
        toText(
            statusObject.nama_status ||
                statusObject.label ||
                item.status_label ||
                item.statusLabel
        ).trim() ||
        statusLabelMap[status] ||
        "Lamaran Baru"
    );
}

function normalizeInterview(item) {
    const interview = item?.interview || {};

    if (!interview || typeof interview !== "object" || !Object.keys(interview).length) {
        return null;
    }

    const date = interview.tanggal_interview || interview.date || "";
    const rawTime =
        interview.jam_interview ||
        interview.jam_mulai ||
        interview.startTime ||
        "";

    const startTime = rawTime ? String(rawTime).slice(0, 5) : "";

    const location =
        interview.lokasi_interview ||
        interview.lokasi ||
        interview.location ||
        "";

    return {
        ...interview,
        date,
        tanggal_interview: date,
        startTime,
        jam_interview: startTime,
        location,
        lokasi_interview: location,
        note:
            interview.hasil_interview ||
            interview.catatan ||
            interview.note ||
            "",
    };
}

function buildTimeline(item) {
    const status = getStatusKey(item);
    const interview = normalizeInterview(item);

    const screeningDone = ["screening", "interview", "accepted", "rejected"].includes(status);
    const interviewDone = ["interview", "accepted"].includes(status);

    return [
        {
            key: "submitted",
            title: "Lamaran Terkirim",
            description: "Lamaran berhasil masuk ke sistem.",
            status: "done",
            dateLabel: formatDateLabel(item.tanggal_lamaran || item.created_at),
        },
        {
            key: "screening",
            title: "Seleksi Administrasi",
            description:
                status === "submitted"
                    ? "Menunggu review HRD."
                    : "Dokumen sudah masuk tahap seleksi administrasi.",
            status: screeningDone ? "done" : "pending",
            dateLabel: screeningDone
                ? formatDateLabel(item.tanggal_review || item.updated_at)
                : "-",
        },
        {
            key: "interview",
            title: "Undangan Interview",
            description:
                interviewDone
                    ? "Pelamar dipanggil interview."
                    : "Belum ada jadwal interview.",
            status: interviewDone ? "done" : "pending",
            dateLabel: interview?.date ? formatDateLabel(interview.date) : "-",
            note: interview
                ? [
                      interview.location ? `Lokasi/Media: ${interview.location}` : "",
                      interview.startTime ? `Jam: ${interview.startTime} WIB` : "",
                  ]
                      .filter(Boolean)
                      .join(" • ")
                : "",
        },
        {
            key: "final",
            title: "Keputusan Akhir",
            description:
                status === "accepted"
                    ? "Pelamar dinyatakan diterima dan otomatis masuk Data Archiving."
                    : status === "rejected"
                      ? "Pelamar belum berhasil pada proses rekrutmen ini."
                      : status === "expired"
                        ? "Lamaran ditandai expired oleh sistem."
                        : "Belum ada keputusan akhir.",
            status:
                status === "accepted"
                    ? "done"
                    : status === "rejected"
                      ? "failed"
                      : status === "expired"
                        ? "expired"
                        : "pending",
            dateLabel: ["accepted", "rejected", "expired"].includes(status)
                ? formatDateLabel(item.tanggal_review || item.updated_at)
                : "-",
        },
    ];
}

function getPenerimaanObject(item) {
    return (
        item.penerimaan ||
        item.data_penerimaan ||
        item.dataPenerimaan ||
        item.dataPenerimaanKaryawan ||
        item.data_penerimaan_karyawan ||
        {}
    );
}

export function normalizePelamar(item) {
    if (!item || typeof item !== "object") return null;

    const pelamar = item.pelamar || {};
    const lowongan = item.lowongan || {};
    const cv = item.cv || item.dokumen?.[0] || item.dokumen_lamaran?.[0] || {};
    const penerimaan = getPenerimaanObject(item);

    const recordId = item.id || item.lamaran_id || item.lamaranId;

    const applicationId = toText(
        item.kode_lamaran ||
            item.kodeLamaran ||
            item.applicationId
    ).trim();

    if (!recordId || !applicationId) return null;

    const cache = getArchiveCache(applicationId);
    const status = getStatusKey(item);
    const deadline = getDeadlineMeta(item);

    const rawCvUrl = cv.url || cv.file_url || cv.path_url || item.cvUrl || "#";
    const cvUrl = normalizeApiFileUrl(rawCvUrl);

    const cvName =
        cv.nama_file ||
        cv.file_name ||
        cv.filename ||
        item.cvName ||
        "CV Pelamar.pdf";

    const acceptedAt =
        penerimaan.tanggal_diterima ||
        item.tanggal_diterima ||
        item.acceptedAt ||
        cache.acceptedAt ||
        null;

    const startDate =
        penerimaan.tanggal_mulai_kerja ||
        item.tanggal_mulai_kerja ||
        item.startDate ||
        cache.startDate ||
        "";

    const archivedAt =
        penerimaan.created_at ||
        item.archived_at ||
        item.archivedAt ||
        cache.archivedAt ||
        acceptedAt ||
        null;

    return {
        ...item,
        id: recordId,
        lamaranId: recordId,
        applicationId,

        fullName: toText(
            penerimaan.nama_lengkap ||
                pelamar.nama_lengkap ||
                item.nama_lengkap ||
                item.fullName
        ).trim(),

        email: toText(
            penerimaan.email ||
                pelamar.email ||
                item.email
        ).trim(),

        phone: toText(
            penerimaan.no_whatsapp ||
                pelamar.no_whatsapp ||
                pelamar.no_hp ||
                item.no_whatsapp ||
                item.no_hp ||
                item.phone
        ).trim(),

        gender: toText(
            pelamar.jenis_kelamin ||
                item.jenis_kelamin ||
                item.gender
        ).trim(),

        birthPlace: toText(
            pelamar.tempat_lahir ||
                item.tempat_lahir ||
                item.birthPlace
        ).trim(),

        birthDate: toText(
            pelamar.tanggal_lahir ||
                item.tanggal_lahir ||
                item.birthDate
        ).trim(),

        address: toText(
            pelamar.alamat ||
                item.alamat ||
                item.address
        ).trim(),

        jobId: lowongan.id || item.lowongan_id || item.jobId,

        jobTitle: toText(
            penerimaan.posisi_diterima ||
                lowongan.judul_lowongan ||
                lowongan.nama_posisi ||
                lowongan.title ||
                item.judul_lowongan ||
                item.posisi ||
                item.jobTitle
        ).trim(),

        appliedAt: item.tanggal_lamaran || item.created_at || item.appliedAt,
        appliedAtLabel:
            item.tanggal_lamaran_label ||
            formatDateLabel(item.tanggal_lamaran || item.created_at),

        updatedAt: item.updated_at || item.updatedAt,
        updatedAtLabel: formatDateLabel(item.updated_at || item.updatedAt),

        expiredAt: item.batas_anti_ghosting || item.expiredAt,
        expiredAtLabel: formatDateLabel(item.batas_anti_ghosting || item.expiredAt),

        status,
        statusLabel: getStatusLabel(item),

        isArchived: Boolean(item.is_archived || item.isArchived || status === "accepted"),

        acceptedAt,
        acceptedAtLabel: formatDateLabel(acceptedAt),

        startDate,
        startDateLabel: formatDateLabel(startDate),

        archivedAt,
        archivedAtLabel: formatDateLabel(archivedAt),

        cvName,
        cvUrl,

        note: toText(item.catatan || item.note).trim(),
        interview: normalizeInterview(item),
        timeline: buildTimeline(item),

        ...deadline,
    };
}

export async function getPelamarList(params = {}) {
    const response = await getAdminPelamarList(params);

    return unwrapListResponse(response)
        .map(normalizePelamar)
        .filter(Boolean);
}

export async function getPelamarById(id) {
    const response = await getAdminPelamarDetail(id);
    return normalizePelamar(unwrapResponse(response));
}

export function getPelamarStatusOptions() {
    return PELAMAR_STATUS_OPTIONS;
}

export function getPelamarPositionOptions(applicants = []) {
    const positions = Array.from(
        new Set(
            safeArray(applicants)
                .map((item) => item.jobTitle)
                .filter(Boolean)
        )
    );

    return [
        { value: "all", label: "Semua Posisi" },
        ...positions.map((position) => ({
            value: position,
            label: position,
        })),
    ];
}

function getStatusSlug(nextStatus) {
    return FRONTEND_TO_BACKEND_STATUS_SLUG[nextStatus] || nextStatus;
}

function cacheAcceptedArchiveData(lamaran, penerimaan) {
    const applicationId = toText(
        lamaran?.kode_lamaran ||
            lamaran?.kodeLamaran ||
            lamaran?.applicationId
    ).trim();

    if (!applicationId || !penerimaan) return;

    saveArchiveCache(applicationId, {
        applicationId,
        acceptedAt: penerimaan.tanggal_diterima || "",
        startDate: penerimaan.tanggal_mulai_kerja || "",
        archivedAt: penerimaan.created_at || penerimaan.tanggal_diterima || "",
        fullName: penerimaan.nama_lengkap || "",
        email: penerimaan.email || "",
        phone: penerimaan.no_whatsapp || "",
        jobTitle: penerimaan.posisi_diterima || "",
    });
}

async function fetchFullDetailAfterAction(lamaranId, actionResponse) {
    const actionParts = unwrapActionParts(actionResponse);

    try {
        const detailResponse = await getAdminPelamarDetail(lamaranId);
        const detail = unwrapResponse(detailResponse);

        return normalizePelamar({
            ...detail,
            interview: actionParts.interview || detail?.interview || null,
            penerimaan: actionParts.penerimaan || getPenerimaanObject(detail),
            dataPenerimaanKaryawan:
                actionParts.penerimaan ||
                detail?.dataPenerimaanKaryawan ||
                null,
        });
    } catch {
        return normalizePelamar({
            ...actionParts.lamaran,
            interview: actionParts.interview,
            penerimaan: actionParts.penerimaan,
        });
    }
}

export async function updatePelamarStatus(lamaranId, nextStatus, extra = {}) {
    let response;

    if (nextStatus === "screening") {
        response = await updateAdminPelamarStatus(lamaranId, {
            status_slug: getStatusSlug(nextStatus),
        });

        return fetchFullDetailAfterAction(lamaranId, response);
    }

    if (nextStatus === "interview") {
        response = await scheduleAdminPelamarInterview(lamaranId, {
            tanggal_interview: extra.date || extra.tanggal_interview || "",
            jam_interview: extra.startTime || extra.jam_interview || "",
            lokasi_interview: extra.location || extra.lokasi_interview || "",
        });

        return fetchFullDetailAfterAction(lamaranId, response);
    }

    if (nextStatus === "accepted") {
        response = await acceptAdminPelamar(lamaranId, {
            tanggal_mulai_kerja: extra.startDate || extra.tanggal_mulai_kerja || null,
            pesan_tambahan: extra.note || extra.pesan_tambahan || "",
        });

        const actionParts = unwrapActionParts(response);

        cacheAcceptedArchiveData(actionParts.lamaran, actionParts.penerimaan);

        return fetchFullDetailAfterAction(lamaranId, response);
    }

    if (nextStatus === "rejected") {
        response = await rejectAdminPelamar(lamaranId, {
            alasan: extra.reason || extra.alasan || "",
        });

        return fetchFullDetailAfterAction(lamaranId, response);
    }

    if (nextStatus === "expired") {
        response = await expireAdminPelamar(lamaranId);

        return fetchFullDetailAfterAction(lamaranId, response);
    }

    response = await updateAdminPelamarStatus(lamaranId, {
        status_slug: getStatusSlug(nextStatus),
    });

    return fetchFullDetailAfterAction(lamaranId, response);
}

export async function removePelamar(id) {
    return deleteAdminPelamar(id);
}