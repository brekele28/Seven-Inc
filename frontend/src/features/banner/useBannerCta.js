import { BANNER_WA_NUMBER } from "./constants";

function normalizePhoneToWa(phone) {
    const raw = String(phone || "").trim();
    const digits = raw.replace(/[^\d]/g, "");

    if (!digits) return "";

    // 08xxxx -> 62xxxx
    if (digits.startsWith("08")) return "62" + digits.slice(1);

    // 62xxxx -> 62xxxx
    if (digits.startsWith("62")) return digits;

    // fallback
    return digits;
}

function openWhatsApp(number) {
    const waPhone = normalizePhoneToWa(number);
    if (!waPhone) return;

    const url = `https://wa.me/${waPhone}`;

    // coba tab baru dulu
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
        // fallback kalau popup diblok
        window.location.href = url;
    }
}

export default function useBannerCta() {
    const handleRegisterClick = () => {
        openWhatsApp(BANNER_WA_NUMBER);
    };

    return { handleRegisterClick };
}