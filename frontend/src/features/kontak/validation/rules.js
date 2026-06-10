export const REQUIRED_FIELDS = ["fullName", "email", "phone", "subject", "message"];

// Nama: huruf + separator wajar (spasi, apostrof, titik, dash)
export const NAME_RULES = {
    minLength: 3,
    // Unicode letters + separator umum, tidak boleh mulai/akhir separator
    pattern: /^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u,
};

export const EMAIL_RULES = {
    allowedDomainsExact: [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com",
        "proton.me",
        "protonmail.com",
    ],
    allowedDomainSuffixes: [".ac.id", ".co.id", ".go.id"],
};

export const PHONE_RULES = {
    minDigits: 10,
    maxDigits: 13,
    allowedPrefixes: ["08", "628"], // setelah normalisasi
};