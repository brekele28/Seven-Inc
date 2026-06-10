export function buildWhatsAppMessage(values) {
    const fullName = String(values?.fullName ?? "").trim();
    const email = String(values?.email ?? "").trim();
    const phone = String(values?.phone ?? "").trim();
    const subject = String(values?.subject ?? "").trim();
    const message = String(values?.message ?? "").trim();

    return [
        "*Kontak Website Seven Inc*",
        "",
        `Nama Lengkap: ${fullName}`,
        `Email: ${email}`,
        `Nomor Telepon: ${phone}`,
        `Subjek: ${subject}`,
        "",
        "Pesan:",
        message,
        "",
        "— Dikirim dari Website Seven Inc.",
    ].join("\n");
}