import {
    LOKER_HERO,
    LOKER_POSITIONS_SECTION,
} from "../data/lowongankerja.dummy";

import { getPublicLowonganList } from "../../../../api/user/lowongan/LowonganApi";

function toText(v) {
    if (v === undefined || v === null) return "";
    return String(v);
}

function normalizeJob(job) {
    if (!job || typeof job !== "object") return null;

    const id = toText(job.id).trim();
    if (!id) return null;

    const metaRaw = job.meta || {};

    return {
        id,
        title: toText(job.title).trim(),
        company: toText(job.company).trim() || "Seven INC",
        meta: {
            position: toText(metaRaw.position || job.title).trim() || "-",
            location: toText(metaRaw.location || job.location).trim() || "-",
            closeDate: toText(metaRaw.closeDate).trim() || "-",
        },
        intro: toText(job.intro).trim(),
    };
}

export function getLowonganKerjaHero() {
    return LOKER_HERO || {
        eyebrow: "LOWONGAN KERJA",
        title: "",
        subtitle: "",
        imageSrc: "",
        imageAlt: "",
    };
}

export function getPositionsSection() {
    return LOKER_POSITIONS_SECTION || {
        eyebrow: "POSISI PEKERJAAN",
        title: "",
    };
}

export async function getJobs({ limit } = {}) {
    const response = await getPublicLowonganList({ limit });

    const list = Array.isArray(response?.data) ? response.data : [];

    return {
        jobs: list.map(normalizeJob).filter(Boolean),
        total: Number(response?.meta?.total || list.length || 0),
    };
}