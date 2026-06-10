import { REQUIRED_FIELDS, NAME_RULES, EMAIL_RULES, PHONE_RULES } from "./rules";
import { VALIDATION_MESSAGES } from "./messages";

export function normalizeTrim(value) {
    return String(value ?? "").trim();
}

export function normalizeDigits(value) {
    return String(value ?? "").replace(/[^\d]/g, "");
}

export function validateRequired(values) {
    const errors = {};
    for (const key of REQUIRED_FIELDS) {
        const v = normalizeTrim(values?.[key]);
        if (!v) errors[key] = VALIDATION_MESSAGES.required;
    }
    return errors;
}

export function validateName(fullName) {
    const name = normalizeTrim(fullName);
    if (!name) return null; // required handled elsewhere

    if (name.length < NAME_RULES.minLength) return VALIDATION_MESSAGES.nameTooShort;

    // no digits at all
    if (/\d/.test(name)) return VALIDATION_MESSAGES.nameInvalid;

    if (!NAME_RULES.pattern.test(name)) return VALIDATION_MESSAGES.nameInvalid;

    return null;
}

export function parseEmail(email) {
    const v = normalizeTrim(email).toLowerCase();
    const at = v.lastIndexOf("@");
    if (at <= 0) return { local: "", domain: "" };
    return { local: v.slice(0, at), domain: v.slice(at + 1) };
}

export function isEmailFormatValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeTrim(email));
}

export function isAllowedEmailDomain(domain) {
    if (!domain) return false;

    if (EMAIL_RULES.allowedDomainsExact.includes(domain)) return true;

    return EMAIL_RULES.allowedDomainSuffixes.some((suffix) => domain.endsWith(suffix));
}

export function validateEmail(email) {
    const v = normalizeTrim(email);
    if (!v) return null;

    if (!isEmailFormatValid(v)) return VALIDATION_MESSAGES.emailInvalid;

    const { domain } = parseEmail(v);
    if (!isAllowedEmailDomain(domain)) return VALIDATION_MESSAGES.emailDomainNotAllowed;

    return null;
}

export function normalizeIndonesianPhone(phoneRaw) {
    const digits = normalizeDigits(phoneRaw);
    if (!digits) return "";

    if (digits.startsWith("62")) return digits;
    if (digits.startsWith("08")) return digits;

    return digits;
}

export function validatePhone(phone) {
    const v = normalizeTrim(phone);
    if (!v) return null;

    const normalized = normalizeIndonesianPhone(v);
    const len = normalized.length;

    if (len < PHONE_RULES.minDigits || len > PHONE_RULES.maxDigits) {
        return VALIDATION_MESSAGES.phoneInvalid;
    }

    const okPrefix = PHONE_RULES.allowedPrefixes.some((p) => normalized.startsWith(p));
    if (!okPrefix) return VALIDATION_MESSAGES.phoneInvalid;

    return null;
}

export function validateKontak(values) {
    const errors = validateRequired(values);

    const nameErr = validateName(values?.fullName);
    if (nameErr) errors.fullName = nameErr;

    const emailErr = validateEmail(values?.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(values?.phone);
    if (phoneErr) errors.phone = phoneErr;

    return errors;
}