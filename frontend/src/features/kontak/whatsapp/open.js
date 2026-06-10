function normalizePhoneToWa(phone) {
    const raw = String(phone || "").trim();
    const digits = raw.replace(/[^\d]/g, "");

    if (!digits) return "";

    if (digits.startsWith("62")) return digits;
    if (digits.startsWith("08")) return "62" + digits.slice(1);

    return digits;
}

export function buildWaUrl({ phone, text }) {
    const waPhone = normalizePhoneToWa(phone);
    const encoded = encodeURIComponent(text || "");
    return `https://wa.me/${waPhone}?text=${encoded}`;
}

export function openWhatsApp({ phone, text }) {
    const url = buildWaUrl({ phone, text });

    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;

    return url;
}