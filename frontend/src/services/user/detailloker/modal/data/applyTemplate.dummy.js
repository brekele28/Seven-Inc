export const APPLY_TEMPLATES = {
    DEFAULT_APPLY: {
        meta: {
            title: "Formulir Lamaran",
            subtitle:
                "Lengkapi data berikut untuk mengajukan lamaran. Pastikan dokumen yang diunggah berformat PDF.",
        },
        sections: [
            {
                id: "identity",
                title: "Identitas",
                description:
                    "Isi data diri kamu dengan benar agar proses rekrutmen lebih cepat.",
                fields: [
                    {
                        name: "nama_lengkap",
                        label: "Nama Lengkap",
                        type: "text",
                        required: true,
                        placeholder: "Contoh: John Doe",
                    },
                    {
                        name: "email",
                        label: "Email",
                        type: "email",
                        required: true,
                        placeholder: "Contoh: johndoe@gmail.com",
                    },
                    {
                        name: "no_whatsapp",
                        label: "No. HP / WhatsApp",
                        type: "tel",
                        required: true,
                        placeholder: "Contoh: 081234567891",
                        helperText:
                            "Gunakan nomor WhatsApp aktif. Informasi status lamaran akan dikirim melalui nomor ini.",
                    },
                    {
                        name: "jenis_kelamin",
                        label: "Jenis Kelamin",
                        type: "select",
                        required: true,
                        placeholder: "Pilih jenis kelamin",
                        options: [
                            { value: "laki-laki", label: "Laki-laki" },
                            { value: "perempuan", label: "Perempuan" },
                        ],
                    },
                    {
                        name: "tempat_lahir",
                        label: "Tempat Lahir",
                        type: "text",
                        required: true,
                        placeholder: "Contoh: Yogyakarta",
                    },
                    {
                        name: "tanggal_lahir",
                        label: "Tanggal Lahir",
                        type: "date",
                        required: true,
                    },
                    {
                        name: "alamat",
                        label: "Alamat",
                        type: "textarea",
                        required: true,
                        placeholder: "Tulis alamat lengkap kamu...",
                    },
                ],
            },
            {
                id: "documents",
                title: "Dokumen",
                description: "Unggah CV / Portfolio dalam format PDF.",
                fields: [
                    {
                        name: "cv_pdf",
                        label: "Upload CV / Portfolio (PDF)",
                        type: "file",
                        required: true,
                        accept: ["application/pdf"],
                        maxSizeMB: 5,
                        helperText: "Format: PDF. Maks: 5MB.",
                    },
                ],
            },
        ],
    },
};