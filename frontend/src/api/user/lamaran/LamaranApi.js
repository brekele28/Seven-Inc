import { apiRequest } from "../../client/ApiClient";

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

export function normalizePhone(value = "") {
    const raw = toText(value).trim();

    if (!raw) return "";

    const onlyNumber = raw.replace(/\D/g, "");

    if (onlyNumber.startsWith("62")) {
        return `0${onlyNumber.slice(2)}`;
    }

    if (onlyNumber.startsWith("8")) {
        return `0${onlyNumber}`;
    }

    return onlyNumber;
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

function normalizeLamaranPayload(payload = {}) {
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
        lowongan_id: getValue(payload, ["lowongan_id", "jobId", "job_id"]),
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

export async function createLamaran(payload) {
    const normalizedPayload = normalizeLamaranPayload(payload);
    const formData = new FormData();

    Object.entries(normalizedPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value);
        }
    });

    return apiRequest("/public/lamaran", {
        method: "POST",
        auth: false,
        body: formData,
        isFormData: true,
    });
}

export async function getLamaranByKode(kodeLamaran) {
    const key = encodeURIComponent(String(kodeLamaran || "").trim());

    return apiRequest(`/public/lamaran/${key}`, {
        method: "GET",
        auth: false,
    });
}

export async function searchLamaranByPhone(phone) {
    const query = new URLSearchParams({
        phone: normalizePhone(phone),
    });

    return apiRequest(`/public/lamaran-search?${query.toString()}`, {
        method: "GET",
        auth: false,
    });
}