import {
    getAdminToken,
    getAdminTokenRemainingSeconds,
    removeAdminToken,
    setAdminToken,
} from "../auth/AuthStorage";

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

let refreshPromise = null;

export function getApiBaseOrigin() {
    try {
        return new URL(API_BASE_URL).origin;
    } catch {
        return "http://localhost:8000";
    }
}

export function normalizeApiFileUrl(url = "") {
    const rawUrl = String(url || "").trim();

    if (!rawUrl || rawUrl === "#") return "#";

    const apiOrigin = getApiBaseOrigin();

    if (rawUrl.startsWith("http://localhost/storage")) {
        return rawUrl.replace("http://localhost", apiOrigin);
    }

    if (rawUrl.startsWith("http://127.0.0.1/storage")) {
        return rawUrl.replace("http://127.0.0.1", apiOrigin);
    }

    if (/^https?:\/\//i.test(rawUrl)) {
        return rawUrl;
    }

    if (rawUrl.startsWith("/storage/")) {
        return `${apiOrigin}${rawUrl}`;
    }

    if (rawUrl.startsWith("storage/")) {
        return `${apiOrigin}/${rawUrl}`;
    }

    return rawUrl;
}

function getFirstValidationError(errors) {
    if (!errors || typeof errors !== "object") return "";

    const values = Object.values(errors).flat();

    return values?.[0] || "";
}

function buildErrorMessage(data, fallback = "Terjadi kesalahan.") {
    const firstValidationError = getFirstValidationError(data?.errors);

    return firstValidationError || data?.message || data?.error || fallback;
}

function isFormDataBody(body, forceFormData = false) {
    return (
        forceFormData ||
        (typeof FormData !== "undefined" && body instanceof FormData)
    );
}

function shouldSkipRefresh(path) {
    const cleanPath = String(path || "");

    return (
        cleanPath.includes("/login") ||
        cleanPath.includes("/register") ||
        cleanPath.includes("/verify-pin") ||
        cleanPath.includes("/refresh") ||
        cleanPath.includes("/logout")
    );
}

function buildHeaders({ token, customHeaders = {}, isFormData }) {
    const headers = {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };

    if (isFormData) {
        delete headers["Content-Type"];
    }

    return headers;
}

async function refreshAdminTokenInternal() {
    const currentToken = getAdminToken();

    if (!currentToken) {
        throw new Error("Token admin tidak ditemukan.");
    }

    if (!refreshPromise) {
        refreshPromise = fetch(`${API_BASE_URL}/refresh`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${currentToken}`,
            },
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw {
                        status: response.status,
                        message: buildErrorMessage(data, "Sesi admin sudah berakhir."),
                        errors: data.errors || {},
                        data,
                    };
                }

                if (!data?.token) {
                    throw new Error("Token baru tidak ditemukan dari server.");
                }

                setAdminToken(data.token, data.expires_in_seconds);

                return data.token;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
}

async function requestOnce(path, options = {}, token = null) {
    const {
        headers: customHeaders = {},
        body,
        isFormData: forceFormData = false,
        ...fetchOptions
    } = options;

    const isFormData = isFormDataBody(body, forceFormData);

    const headers = buildHeaders({
        token,
        customHeaders,
        isFormData,
    });

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...fetchOptions,
        headers,
        body,
    });

    const data = await response.json().catch(() => ({}));

    return {
        response,
        data,
    };
}

export async function apiRequest(path, options = {}) {
    const { auth = true, ...requestOptions } = options;

    let token = auth ? getAdminToken() : null;

    if (auth && token && !shouldSkipRefresh(path)) {
        const remainingSeconds = getAdminTokenRemainingSeconds();

        if (remainingSeconds > 0 && remainingSeconds <= 60) {
            try {
                token = await refreshAdminTokenInternal();
            } catch {
                removeAdminToken();

                throw {
                    status: 401,
                    message: "Sesi admin sudah berakhir. Silakan login lagi.",
                    errors: {},
                };
            }
        }
    }

    let { response, data } = await requestOnce(path, requestOptions, token);

    if (response.status === 401 && auth && !shouldSkipRefresh(path)) {
        try {
            token = await refreshAdminTokenInternal();
            const retry = await requestOnce(path, requestOptions, token);

            response = retry.response;
            data = retry.data;
        } catch {
            removeAdminToken();

            throw {
                status: 401,
                message: "Sesi admin sudah berakhir. Silakan login lagi.",
                errors: {},
            };
        }
    }

    if (!response.ok) {
        if (response.status === 401) {
            removeAdminToken();
        }

        throw {
            status: response.status,
            message: buildErrorMessage(data),
            errors: data.errors || {},
            error: data.error || "",
            data,
        };
    }

    return data;
}