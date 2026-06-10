export function formatISOToLabel(iso) {
    if (!iso) return "-";
    try {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "-";
        // format sederhana: 05 Jun 2025
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = months[d.getMonth()];
        const yy = d.getFullYear();
        return `${dd} ${mm} ${yy}`;
    } catch {
        return "-";
    }
}

export function formatPhoneLabel(phone) {
    return String(phone || "-");
}

export function pickUpdatedAtISO(app) {
    return app.updatedAtISO || app.createdAtISO || "";
}