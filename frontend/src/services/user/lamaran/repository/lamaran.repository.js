import {
    createLamaran,
    getLamaranByKode,
    searchLamaranByPhone,
} from "../../../../api/user/lamaran/LamaranApi";

function unwrapResponse(response) {
    return response?.data || response?.lamaran || response;
}

function unwrapListResponse(response) {
    const data =
        response?.data?.data ||
        response?.data ||
        response?.lamaran ||
        response?.items ||
        response;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;

    return [];
}

function isFile(value) {
    return typeof File !== "undefined" && value instanceof File;
}

function isFileList(value) {
    return typeof FileList !== "undefined" && value instanceof FileList;
}

function toText(value) {
    if (value === undefined || value === null) return "";
    return String(value);
}

function getValue(payload = {}, aliases = []) {
    for (const key of aliases) {
        const value = payload?.[key];

        if (value === undefined || value === null) continue;

        if (isFile(value)) return value;

        if (isFileList(value)) {
            return value.length ? value[0] : "";
        }

        if (Array.isArray(value) && value.length) {
            return value[0];
        }

        if (String(value).trim() !== "") {
            return value;
        }
    }

    return "";
}

export function normalizePhone(phone) {
    const raw = toText(phone).replace(/\D/g, "");

    if (!raw) return "";

    if (raw.startsWith("62")) {
        return `0${raw.slice(2)}`;
    }

    if (raw.startsWith("8")) {
        return `0${raw}`;
    }

    return raw;
}

function normalizeDate(value) {
    const raw = toText(value).trim();

    if (!raw) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        return raw;
    }

    const slashMatch = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (slashMatch) {
        const [, day, month, year] = slashMatch;

        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }

    return raw;
}

function getKodeLamaran(response) {
    return (
        response?.kode_lamaran ||
        response?.kodeLamaran ||
        response?.applicationId ||
        response?.data?.kode_lamaran ||
        response?.data?.kodeLamaran ||
        response?.data?.applicationId ||
        ""
    );
}

function getLowonganId(item) {
    return toText(
        item?.lowongan?.id ||
        item?.lowongan_id ||
        item?.jobId ||
        item?.job_id ||
        ""
    ).trim();
}

function getKodeLamaranText(item) {
    return toText(
        item?.kode_lamaran ||
        item?.kodeLamaran ||
        item?.applicationId ||
        ""
    ).trim();
}

function mapApplyPayloadToApiPayload({ jobId, payload = {} }) {
    const phone = getValue(payload, [
        "no_whatsapp",
        "phone",
        "no_hp",
        "whatsapp",
        "noWhatsapp",
        "phoneNumber",
    ]);

    const cvPdf = getValue(payload, [
        "cv_pdf",
        "cvPdf",
        "cv",
        "file",
        "dokumen",
    ]);

    return {
        lowongan_id: toText(jobId || payload.lowongan_id || payload.jobId || "").trim(),
        nama_lengkap: getValue(payload, [
            "nama_lengkap",
            "fullName",
            "name",
            "nama",
        ]),
        email: getValue(payload, ["email"]),
        no_whatsapp: normalizePhone(phone),
        jenis_kelamin: getValue(payload, [
            "jenis_kelamin",
            "gender",
        ]),
        tempat_lahir: getValue(payload, [
            "tempat_lahir",
            "birthPlace",
        ]),
        tanggal_lahir: normalizeDate(
            getValue(payload, [
                "tanggal_lahir",
                "birthDate",
            ])
        ),
        alamat: getValue(payload, [
            "alamat",
            "address",
        ]),
        cv_pdf: cvPdf,
    };
}

async function assertNotDuplicateLamaran(apiPayload) {
    const phone = normalizePhone(apiPayload.no_whatsapp);
    const lowonganId = toText(apiPayload.lowongan_id).trim();

    if (!phone || !lowonganId) return;

    try {
        const response = await searchLamaranByPhone(phone);
        const list = unwrapListResponse(response);

        const existing = list.find((item) => {
            return getLowonganId(item) === lowonganId;
        });

        if (existing) {
            const kode = getKodeLamaranText(existing);

            throw new Error(
                kode
                    ? `Kamu sudah pernah melamar pada lowongan ini. Kode lamaran kamu: ${kode}.`
                    : "Kamu sudah pernah melamar pada lowongan ini."
            );
        }
    } catch (err) {
        if (err?.message?.includes("sudah pernah melamar")) {
            throw err;
        }

        // Kalau pengecekan awal gagal karena data belum ada / jaringan sesaat,
        // submit utama tetap dilanjutkan agar tidak memblokir pelamar baru.
    }
}

export async function submitLamaran({ jobId, payload }) {
    const apiPayload = mapApplyPayloadToApiPayload({ jobId, payload });

    await assertNotDuplicateLamaran(apiPayload);

    const response = await createLamaran(apiPayload);
    const data = unwrapResponse(response);

    const kodeLamaran = getKodeLamaran(response) || getKodeLamaran(data);

    return {
        ...data,
        applicationId: kodeLamaran,
        kode_lamaran: kodeLamaran,
    };
}

export async function createApplication({ jobId, jobTitle = "", payload }) {
    const data = await submitLamaran({ jobId, payload });

    return {
        ...data,
        jobTitle,
        applicationId: data.applicationId || data.kode_lamaran || "",
    };
}

export async function findLamaranByKode(kodeLamaran) {
    const response = await getLamaranByKode(kodeLamaran);
    return unwrapResponse(response);
}

export async function findLamaranByPhone(phone) {
    const response = await searchLamaranByPhone(normalizePhone(phone));
    return unwrapListResponse(response);
}