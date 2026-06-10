import tampilanData from "../data/tampilanData";

export function getTampilan() {
    return {
        ...tampilanData,
    };
}

export async function saveTampilan(payload) {
    console.log("save tampilan", payload);

    return payload;
}

export async function resetTampilan() {
    return {
        ...tampilanData,
    };
}