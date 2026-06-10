// Dummy in-memory store (simple & predictable)
// Bisa kamu ganti ke API nanti tanpa ubah UI components.

export const LAMARAN_STORE = {
    applications: [
        {
            applicationId: "APP-24F91A",
            jobId: "loker-1",
            jobTitle: "Staff Human Resources Development (HRD)",
            email: "demo.hr@example.com",
            phone: "+6281234567890",
            createdAtISO: "2025-05-18T10:20:00.000Z",
            updatedAtISO: "2025-05-20T08:10:00.000Z",
            timeline: [
                {
                    key: "submitted",
                    title: "Lamaran Terkirim",
                    description: "Lamaran berhasil masuk ke sistem kami.",
                    dateISO: "2025-05-18T10:20:00.000Z",
                    status: "done",
                },
                {
                    key: "review",
                    title: "Seleksi Administrasi",
                    description: "Tim kami sedang meninjau kelengkapan dokumen.",
                    dateISO: "2025-05-19T09:00:00.000Z",
                    status: "done",
                },
                {
                    key: "interview",
                    title: "Undangan Interview",
                    description: "Jika lolos seleksi, kamu akan dihubungi untuk interview.",
                    dateISO: "",
                    status: "pending",
                    note: "Pastikan nomor WhatsApp aktif.",
                },
                {
                    key: "final",
                    title: "Keputusan Akhir",
                    description: "Pengumuman hasil akhir proses rekrutmen.",
                    dateISO: "",
                    status: "pending",
                },
            ],
        },
        {
            applicationId: "APP-7710BC",
            jobId: "loker-2",
            jobTitle: "Content Writer",
            email: "writer.demo@example.com",
            phone: "+6281122233344",
            createdAtISO: "2025-06-02T08:00:00.000Z",
            updatedAtISO: "2025-06-05T15:20:00.000Z",
            timeline: [
                {
                    key: "submitted",
                    title: "Lamaran Terkirim",
                    description: "Lamaran berhasil masuk ke sistem kami.",
                    dateISO: "2025-06-02T08:00:00.000Z",
                    status: "done",
                },
                {
                    key: "review",
                    title: "Seleksi Administrasi",
                    description: "Tim kami sedang meninjau kelengkapan dokumen.",
                    dateISO: "2025-06-03T10:30:00.000Z",
                    status: "done",
                },
                {
                    key: "interview",
                    title: "Undangan Interview",
                    description: "Jika lolos seleksi, kamu akan dihubungi untuk interview.",
                    dateISO: "2025-06-05T15:20:00.000Z",
                    status: "done",
                    note: "Silakan cek email untuk jadwal interview.",
                },
                {
                    key: "final",
                    title: "Keputusan Akhir",
                    description: "Pengumuman hasil akhir proses rekrutmen.",
                    dateISO: "",
                    status: "pending",
                },
            ],
        },
    ],
};