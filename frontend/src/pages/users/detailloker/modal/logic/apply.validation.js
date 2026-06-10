export function isPdfFile(file) {
    if (!file) return false;
    const isMimePdf = file.type === "application/pdf";
    const isExtPdf = String(file.name || "").toLowerCase().endsWith(".pdf");
    return isMimePdf || isExtPdf;
}

export function bytesToMB(bytes) {
    return bytes / (1024 * 1024);
}

export function validateRequired(value) {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    return true;
}

export function validateEmail(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function validatePhone(phone) {
    if (!phone) return false;
    const v = String(phone).trim();
    return /^[+]?[\d\s]{8,20}$/.test(v);
}