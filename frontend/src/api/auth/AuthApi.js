import { apiRequest } from "../client/ApiClient";

import {
    getAdminToken,
    setAdminToken,
    setRegisterTicket,
    clearRegisterTicket,
    clearAdminSession,
    shouldRefreshAdminToken,
} from "./AuthStorage";

export async function verifyAdminPin(pin) {
    const data = await apiRequest("/verify-pin", {
        method: "POST",
        auth: false,
        body: JSON.stringify({ pin }),
    });

    setRegisterTicket(data.register_ticket, data.expires_in_seconds);

    return data;
}

export async function registerAdmin(payload) {
    const data = await apiRequest("/register", {
        method: "POST",
        auth: false,
        body: JSON.stringify(payload),
    });

    clearRegisterTicket();

    return data;
}

export async function loginAdmin(payload) {
    const data = await apiRequest("/login", {
        method: "POST",
        auth: false,
        body: JSON.stringify(payload),
    });

    setAdminToken(data.token, data.expires_in_seconds);
    clearRegisterTicket();

    return data;
}

export async function getAdminProfile() {
    return apiRequest("/admin/profile", {
        method: "GET",
    });
}

export async function refreshAdminToken() {
    const data = await apiRequest("/refresh", {
        method: "POST",
    });

    setAdminToken(data.token, data.expires_in_seconds);

    return data;
}

export async function ensureValidAdminSession() {
    const token = getAdminToken();

    if (!token) {
        clearAdminSession();
        return false;
    }

    try {
        if (shouldRefreshAdminToken(60)) {
            await refreshAdminToken();
        }

        await getAdminProfile();

        return true;
    } catch {
        clearAdminSession();
        return false;
    }
}

export async function logoutAdmin() {
    try {
        await apiRequest("/logout", {
            method: "POST",
        });
    } finally {
        clearAdminSession();
    }
}