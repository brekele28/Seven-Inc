const TOKEN_KEY = "admin_token";
const TOKEN_EXPIRES_KEY = "admin_token_expires_at";

const TICKET_KEY = "admin_register_ticket";
const PIN_EXPIRES_KEY = "admin_pin_expires_at";

const DEFAULT_TOKEN_TTL_SECONDS = 900;
const DEFAULT_PIN_TTL_SECONDS = 900;

function now() {
    return Date.now();
}

function toMs(seconds) {
    return Number(seconds || 0) * 1000;
}

export function setAdminToken(token, expiresInSeconds = DEFAULT_TOKEN_TTL_SECONDS) {
    if (!token) return;

    const expiresAt = now() + toMs(expiresInSeconds);

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRES_KEY, String(expiresAt));
}

export function getAdminToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAt = Number(localStorage.getItem(TOKEN_EXPIRES_KEY));

    if (!token || !expiresAt) {
        removeAdminToken();
        return null;
    }

    if (now() > expiresAt) {
        removeAdminToken();
        return null;
    }

    return token;
}

export function getAdminTokenExpiresAt() {
    return Number(localStorage.getItem(TOKEN_EXPIRES_KEY)) || null;
}

export function getAdminTokenRemainingSeconds() {
    const expiresAt = getAdminTokenExpiresAt();

    if (!expiresAt) return 0;

    return Math.max(0, Math.floor((expiresAt - now()) / 1000));
}

export function shouldRefreshAdminToken(bufferSeconds = 60) {
    const token = getAdminToken();

    if (!token) return false;

    return getAdminTokenRemainingSeconds() <= bufferSeconds;
}

export function removeAdminToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRES_KEY);
}

export function setRegisterTicket(ticket, expiresInSeconds = DEFAULT_PIN_TTL_SECONDS) {
    if (!ticket) return;

    const expiresAt = now() + toMs(expiresInSeconds);

    localStorage.setItem(TICKET_KEY, ticket);
    localStorage.setItem(PIN_EXPIRES_KEY, String(expiresAt));
}

export function getRegisterTicket() {
    const ticket = localStorage.getItem(TICKET_KEY);
    const expiresAt = Number(localStorage.getItem(PIN_EXPIRES_KEY));

    if (!ticket || !expiresAt || now() > expiresAt) {
        clearRegisterTicket();
        return null;
    }

    return ticket;
}

export function clearRegisterTicket() {
    localStorage.removeItem(TICKET_KEY);
    localStorage.removeItem(PIN_EXPIRES_KEY);
}

export function clearAdminSession() {
    removeAdminToken();
    clearRegisterTicket();
}