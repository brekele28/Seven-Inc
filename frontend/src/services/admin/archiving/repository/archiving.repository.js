import {
    getAdminArchivingDetail,
    getAdminArchivingList,
} from "../../../../api/admin/archiving/ArchivingApi";

import { normalizeApiFileUrl } from "../../../../api/client/ApiClient";

const ARCHIVE_CACHE_KEY = "seveninc_admin_archive_cache";

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

function getArchiveCache(applicationId) {
    const key = toText(applicationId).trim();

    if (!key) return {};

    const cache = readArchiveCache();

    return cache[key] || {};
}

function unwrapResponse(response) {
    return response?.data || response?.archive || response?.archiving || response;
}

function unwrapListResponse(response) {
    const data =
        response?.data?.data ||
        response?.data ||
        response?.items ||
        response?.archives ||
        response?.archiving ||
        response;

    return safeArray(data);
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

function getPenerimaanObject(item, lamaran) {
    return (
        item.penerimaan ||
        item.data_penerimaan ||
        item.dataPenerimaan ||
        item.dataPenerimaanKaryawan ||
        item.data_penerimaan_karyawan ||
        lamaran?.penerimaan ||
        lamaran?.dataPenerimaan ||
        lamaran?.dataPenerimaanKaryawan ||
        {}
    );
}

export function normalizeArchive(item) {
    if (!item || typeof item !== "object") return null;

    const lamaran = item.lamaran || item;
    const pelamar = item.pelamar || lamaran.pelamar || {};
    const lowongan = item.lowongan || lamaran.lowongan || {};
    const cv = item.cv || lamaran.cv || lamaran.dokumen?.[0] || {};

    const penerimaan = getPenerimaanObject(item, lamaran);

    const recordId = item.id || lamaran.id || item.lamaran_id || item.lamaranId;

    const applicationId = toText(
        lamaran.kode_lamaran ||
            item.kode_lamaran ||
            item.kodeLamaran ||
            item.applicationId
    ).trim();

    if (!recordId || !applicationId) return null;

    const cache = getArchiveCache(applicationId);

    const acceptedAt =
        penerimaan.tanggal_diterima ||
        item.tanggal_diterima ||
        item.accepted_at ||
        item.acceptedAt ||
        cache.acceptedAt ||
        lamaran.tanggal_review ||
        item.tanggal_review ||
        item.updated_at;

    const startDate =
        penerimaan.tanggal_mulai_kerja ||
        item.tanggal_mulai_kerja ||
        item.tanggal_mulai ||
        item.start_date ||
        item.startDate ||
        cache.startDate ||
        "";

    const archivedAt =
        item.tanggal_arsip ||
        item.archived_at ||
        item.created_at ||
        item.archivedAt ||
        cache.archivedAt ||
        acceptedAt;

    const rawCvUrl = cv.url || cv.file_url || cv.path_url || item.cvUrl || "#";
    const cvUrl = normalizeApiFileUrl(rawCvUrl);

    const cvName =
        cv.nama_file ||
        cv.file_name ||
        cv.filename ||
        item.cvName ||
        "CV Pelamar.pdf";

    const jobTitle = toText(
        penerimaan.posisi_diterima ||
            item.posisi_diterima ||
            lowongan.judul_lowongan ||
            lowongan.nama_posisi ||
            lowongan.title ||
            item.judul_lowongan ||
            item.posisi ||
            item.jobTitle ||
            cache.jobTitle
    ).trim();

    const archiveYear = toText(
        item.tahun ||
            item.archiveYear ||
            new Date(archivedAt || acceptedAt || Date.now()).getFullYear()
    ).trim();

    return {
        ...item,
        id: recordId,
        lamaranId: recordId,
        applicationId,

        fullName: toText(
            penerimaan.nama_lengkap ||
                pelamar.nama_lengkap ||
                item.nama_lengkap ||
                item.fullName ||
                cache.fullName
        ).trim(),

        email: toText(
            penerimaan.email ||
                pelamar.email ||
                item.email ||
                cache.email
        ).trim(),

        phone: toText(
            penerimaan.no_whatsapp ||
                pelamar.no_whatsapp ||
                pelamar.no_hp ||
                item.no_whatsapp ||
                item.no_hp ||
                item.phone ||
                cache.phone
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
        jobTitle: jobTitle || "-",

        acceptedAt,
        acceptedAtLabel:
            item.accepted_at_label ||
            item.acceptedAtLabel ||
            item.tanggal_diterima_label ||
            formatDateLabel(acceptedAt),

        startDate,
        startDateLabel:
            item.start_date_label ||
            item.startDateLabel ||
            item.tanggal_mulai_label ||
            item.tanggal_mulai_kerja_label ||
            formatDateLabel(startDate),

        archiveYear,

        archivedAt,
        archivedAtLabel:
            item.archived_at_label ||
            item.archivedAtLabel ||
            item.tanggal_arsip_label ||
            formatDateLabel(archivedAt),

        cvName,
        cvUrl,

        note: toText(item.catatan || item.note).trim(),
    };
}

export async function getArchiveList(params = {}) {
    const response = await getAdminArchivingList(params);

    return unwrapListResponse(response)
        .map(normalizeArchive)
        .filter(Boolean);
}

export async function getArchiveById(id) {
    const response = await getAdminArchivingDetail(id);
    return normalizeArchive(unwrapResponse(response));
}

export function getArchivePositionOptions(archives = []) {
    const positions = Array.from(
        new Set(
            safeArray(archives)
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

export function getArchiveYearOptions(archives = []) {
    const years = Array.from(
        new Set(
            safeArray(archives)
                .map((item) => item.archiveYear)
                .filter(Boolean)
        )
    ).sort((a, b) => Number(b) - Number(a));

    return [
        { value: "all", label: "Semua Tahun" },
        ...years.map((year) => ({
            value: year,
            label: year,
        })),
    ];
}