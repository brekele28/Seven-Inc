import { apiRequest } from "../../client/ApiClient";

function cleanId(id) {
    return encodeURIComponent(String(id || "").trim());
}

export async function getAdminArchivingList(params = {}) {
    const query = new URLSearchParams();

    query.append("status", "diterima");

    Object.entries(params || {}).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "all" &&
            key !== "status"
        ) {
            query.append(key, value);
        }
    });

    return apiRequest(`/admin/e-recruitment/pelamar?${query.toString()}`, {
        method: "GET",
    });
}

export async function getAdminArchivingDetail(id) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}`, {
        method: "GET",
    });
}