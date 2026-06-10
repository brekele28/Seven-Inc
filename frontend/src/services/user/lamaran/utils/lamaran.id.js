function randomHex(len = 6) {
    const chars = "0123456789ABCDEF";
    let out = "";
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
}

export function generateApplicationId() {
    return `APP-${randomHex(6)}`;
}