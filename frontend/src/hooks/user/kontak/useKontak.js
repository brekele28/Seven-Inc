import { useMemo, useState } from "react";
import { kontakDummy } from "../../../services/user/kontak/data/kontak.dummy";
import { validateKontak } from "../../../features/kontak/validation/validators";
import { buildWhatsAppMessage } from "../../../features/kontak/whatsapp/template";
import { openWhatsApp } from "../../../features/kontak/whatsapp/open";

const DEFAULT_TARGET_WA_NUMBER = "0816666207";

function firstErrorMessage(errors) {
    const order = ["fullName", "email", "phone", "subject", "message"];
    for (const k of order) {
        if (errors?.[k]) return errors[k];
    }
    const keys = Object.keys(errors || {});
    return keys.length ? errors[keys[0]] : "";
}

export default function useKontak({ targetWaNumber = DEFAULT_TARGET_WA_NUMBER } = {}) {
    const subjectOptions = useMemo(() => kontakDummy.subjectOptions, []);

    const [values, setValues] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // modal state (shared)
    const [dialog, setDialog] = useState({
        open: false,
        variant: "success", // "success" | "error"
        title: "",
        message: "",
        payload: null, // untuk simpan waText dll
    });

    const resetForm = () => {
        setValues({ fullName: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
    };

    const closeDialog = () => {
        setDialog((prev) => ({ ...prev, open: false, payload: null }));
    };

    const setField = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));

        // clear error per-field saat user edit
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });
    };

    const validate = () => {
        const nextErrors = validateKontak(values);
        setErrors(nextErrors);
        return { ok: Object.keys(nextErrors).length === 0, nextErrors };
    };

    const submit = async (e) => {
        e?.preventDefault?.();
        if (isSubmitting) return;

        const { ok, nextErrors } = validate();
        if (!ok) {
            setDialog({
                open: true,
                variant: "error",
                title: "Data belum valid",
                message: firstErrorMessage(nextErrors) || "Periksa kembali data kamu.",
                payload: null,
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const waText = buildWhatsAppMessage(values);

            // ✅ tampilkan modal konfirmasi
            setDialog({
                open: true,
                variant: "success",
                title: "Konfirmasi Pengiriman",
                message:
                    "Apakah kamu yakin datamu sudah benar? Tekan tombol “Ya, Kirim” untuk membuka WhatsApp dengan pesan yang sudah disiapkan.",
                payload: { waText },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmSend = () => {
        const waText = dialog?.payload?.waText;
        if (!waText) return;

        // ✅ reset sebelum buka WA (biar user balik form sudah bersih)
        resetForm();

        // ✅ tutup dialog sukses
        closeDialog();

        // ✅ buka WA
        openWhatsApp({ phone: targetWaNumber, text: waText });
    };

    const cancelSend = () => {
        // ✅ cancel dianggap "Tidak" => reset
        resetForm();

        // ✅ tutup dialog sukses dulu (kalau sedang open)
        closeDialog();

        // ✅ tampilkan alert batal (pakai modal gagal sesuai request kamu)
        setDialog({
            open: true,
            variant: "error",
            title: "Pengiriman dibatalkan",
            message:
                "Kamu memilih untuk tidak mengirim pesan. Silakan isi kembali jika ingin mencoba lagi.",
            payload: null,
        });
    };

    return {
        values,
        errors,
        isSubmitting,
        subjectOptions,
        setField,
        submit,

        dialog,
        closeDialog,
        confirmSend,
        cancelSend,

        resetForm,
    };
}