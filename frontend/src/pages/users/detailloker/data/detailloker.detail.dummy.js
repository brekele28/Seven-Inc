
/**
 * Format aman untuk UI:
 * - sections: array of { id, title, items[] }
 * - note: string
 * - ctaText: string
 *
 * Tidak ada HTML mentah di sini (lebih aman dari XSS).
 */

const DEFAULT_DETAIL = {
    sections: [
        {
            id: "general",
            title: "KUALIFIKASI UMUM",
            items: [
                "Usia minimal 18 tahun.",
                "Domisili sesuai kebutuhan perusahaan.",
                "Bersedia mengikuti proses rekrutmen.",
            ],
        },
        {
            id: "special",
            title: "KUALIFIKASI KHUSUS",
            items: ["Memiliki pengalaman sesuai posisi.", "Mampu bekerja dalam tim."],
        },
        {
            id: "responsibility",
            title: "TANGGUNG JAWAB",
            items: ["Menjalankan tugas sesuai jobdesk.", "Berkoordinasi dengan tim terkait."],
        },
        {
            id: "benefit",
            title: "BENEFIT",
            items: ["Gaji pokok & bonus sesuai kebijakan.", "Pengembangan diri & pelatihan."],
        },
    ],
    note: "Hanya lamaran yang sesuai kualifikasi yang kami proses.",
    ctaText: "Daftar Sekarang",
};

/**
 * Detail per job.
 * Kamu bebas ubah isi (items) sesuai SOP tiap lowongan.
 * Struktur layout tetap sama => UI tidak perlu refactor besar.
 */
export const LOKER_DETAILS_BY_JOB_ID = {
    "loker-1": {
        sections: [
            {
                id: "general",
                title: "KUALIFIKASI UMUM",
                items: [
                    "Wanita - usia 18-30 tahun (diutamakan sedang tidak kuliah).",
                    "Domisili Yogyakarta & sekitarnya.",
                    "Pendidikan terakhir minimal S1 Psikologi/Manajemen SDM.",
                    "Bersedia di kontrak minimal 1 tahun.",
                    "Ada laptop/netbook.",
                    "Siap bekerja 8 jam/hari pada pukul 08.00-17.00 WIB.",
                    "Mampu bekerja secara individu maupun tim.",
                ],
            },
            {
                id: "special",
                title: "KUALIFIKASI KHUSUS",
                items: [
                    "Bisa blog & sosmed.",
                    "Mengerti dunia HRD.",
                    "Paham rekrutmen-seleksi & menguasai kegiatan HRD lainnya.",
                    "Disiplin, komunikatif, inisiatif, tanggung jawab, dan mampu bekerjasama.",
                    "Cekatan dalam lingkungan fast paced.",
                    "Kemampuan interpersonal baik.",
                    "Dapat bekerja di bawah tekanan.",
                ],
            },
            {
                id: "responsibility",
                title: "TANGGUNG JAWAB",
                items: [
                    "Rekrutmen & seleksi karyawan (iklan loker, interview, tes serta pelaporannya).",
                    "Mengurusi kebutuhan administratif setiap kegiatan HRD (surat-menyurat, dll).",
                    "Mengontrol kedisiplinan karyawan (presensi, dll).",
                    "Penilaian kinerja karyawan.",
                ],
            },
            {
                id: "benefit",
                title: "BENEFIT",
                items: [
                    "Gaji pokok & bonus-bonus.",
                    "Suasana kantor kekeluargaan.",
                    "Kegiatan rutin menyenangkan (motivating competition, one-day outing, cooking day, english day, dresscode day, dll).",
                    "Pelatihan & pengembangan diri.",
                ],
            },
        ],
        note: "Hanya lamaran yang sesuai kualifikasi yang kami proses.",
        ctaText: "Daftar Sekarang",
    },

    // Contoh fleksibel: Fullstack bisa beda SOP, misal laki-laki/perempuan, dll
    "loker-7": {
        sections: [
            {
                id: "general",
                title: "KUALIFIKASI UMUM",
                items: [
                    "Laki-laki / Perempuan.",
                    "Usia 18-35 tahun.",
                    "Domisili Yogyakarta & sekitarnya (atau bersedia relokasi).",
                    "Komunikatif dan punya growth mindset.",
                ],
            },
            {
                id: "special",
                title: "KUALIFIKASI KHUSUS",
                items: [
                    "Menguasai React dan konsep component-driven UI.",
                    "Mengerti REST API dan auth basic (token/cookie).",
                    "Paham konsep state management & clean code.",
                    "Bonus: pernah pakai Node.js / Laravel / database SQL.",
                ],
            },
            {
                id: "responsibility",
                title: "TANGGUNG JAWAB",
                items: [
                    "Membangun UI yang rapi, responsif, dan mudah dirawat.",
                    "Integrasi API dengan aman (validasi input, error handling).",
                    "Kolaborasi dengan tim desain dan backend.",
                ],
            },
            {
                id: "benefit",
                title: "BENEFIT",
                items: [
                    "Gaji kompetitif.",
                    "Jam kerja jelas.",
                    "Kesempatan belajar & pengembangan karir.",
                ],
            },
        ],
        note: "Hanya lamaran yang sesuai kualifikasi yang kami proses.",
        ctaText: "Daftar Sekarang",
    },
};

/**
 * Getter yang aman:
 * - selalu return bentuk yang valid
 * - jika jobId belum punya detail, fallback ke default
 */
export function getDetailByJobId(jobId) {
    const key = String(jobId || "").trim();
    const found = key ? LOKER_DETAILS_BY_JOB_ID[key] : null;
    return found || DEFAULT_DETAIL;
}