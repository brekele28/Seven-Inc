// Simulasi API (dummy). Nanti tinggal ganti ke fetch/axios.
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function sendMessage(payload) {
    await sleep(900);

    // Simulasi 10% gagal untuk testing UI error
    const fail = Math.random() < 0.1;
    if (fail) {
        const err = new Error("Server sedang sibuk. Coba lagi sebentar.");
        err.code = "BUSY";
        throw err;
    }

    // Return response dummy
    return {
        ok: true,
        data: {
            id: `MSG-${Date.now()}`,
            ...payload,
        },
    };
}

export const kontakRepository = {
    sendMessage,
};