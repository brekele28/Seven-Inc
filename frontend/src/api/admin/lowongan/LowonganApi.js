import { apiRequest } from "../../client/ApiClient";

export async function getAdminLowonganList() {
    return apiRequest("/admin/lowongan", {
        method: "GET",
    });
}

export async function createAdminLowongan(payload) {
    return apiRequest("/admin/lowongan", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function getAdminLowonganDetail(id) {
    return apiRequest(`/admin/lowongan/${id}`, {
        method: "GET",
    });
}

export async function updateAdminLowongan(id, payload) {
    return apiRequest(`/admin/lowongan/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}

export async function publishAdminLowongan(id) {
    return apiRequest(`/admin/lowongan/${id}/publish`, {
        method: "PATCH",
    });
}

export async function closeAdminLowongan(id) {
    return apiRequest(`/admin/lowongan/${id}/close`, {
        method: "PATCH",
    });
}

export async function deleteAdminLowongan(id) {
    return apiRequest(`/admin/lowongan/${id}`, {
        method: "DELETE",
    });
}