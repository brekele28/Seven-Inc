import { apiRequest } from "../../client/ApiClient";

export async function getPublicLowonganList({ limit = 10 } = {}) {
    return apiRequest(`/public/lowongan?limit=${limit}`, {
        method: "GET",
        auth: false,
    });
}

export async function getPublicLowonganDetail(id) {
    return apiRequest(`/public/lowongan/${id}`, {
        method: "GET",
        auth: false,
    });
}