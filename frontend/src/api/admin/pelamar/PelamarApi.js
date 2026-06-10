import { apiRequest } from "../../client/ApiClient";

function cleanId(id) {
    return encodeURIComponent(String(id || "").trim());
}

export async function getAdminPelamarList(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "all"
        ) {
            query.append(key, value);
        }
    });

    const queryString = query.toString();

    return apiRequest(
        `/admin/e-recruitment/pelamar${queryString ? `?${queryString}` : ""}`,
        {
            method: "GET",
        }
    );
}

export async function getAdminPelamarDetail(id) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}`, {
        method: "GET",
    });
}

export async function updateAdminPelamarStatus(id, payload = {}) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}/status`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export async function scheduleAdminPelamarInterview(id, payload = {}) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}/interview`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export async function acceptAdminPelamar(id, payload = {}) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}/accept`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export async function rejectAdminPelamar(id, payload = {}) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}/reject`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export async function expireAdminPelamar(id) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}/expire`, {
        method: "PATCH",
        body: JSON.stringify({}),
    });
}

export async function deleteAdminPelamar(id) {
    return apiRequest(`/admin/e-recruitment/pelamar/${cleanId(id)}`, {
        method: "DELETE",
    });
}