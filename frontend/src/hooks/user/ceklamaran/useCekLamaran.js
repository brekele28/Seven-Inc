import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CEK_LAMARAN_UI } from "../../../services/user/ceklamaran/data/ceklamaran.ui.dummy";
import {
    normalizePhone,
    searchLamaranById,
    searchLamaranByWhatsapp,
} from "../../../services/user/ceklamaran/repository/ceklamaran.repository";

const LAST_SEARCH_PHONE_KEY = "seveninc_last_search_phone";
const LAST_SEARCH_ID_KEY = "seveninc_last_search_id";

function getLocalStorageItem(key) {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(key) || "";
}

function setLocalStorageItem(key, value) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
}

export default function useCekLamaran() {
    const navigate = useNavigate();

    const suggestedPhone = useMemo(() => {
        return getLocalStorageItem(LAST_SEARCH_PHONE_KEY);
    }, []);

    const suggestedId = useMemo(() => {
        return getLocalStorageItem(LAST_SEARCH_ID_KEY);
    }, []);

    const [mode, setMode] = useState("id");
    const [idValue, setIdValue] = useState(suggestedId);
    const [phoneValue, setPhoneValue] = useState(suggestedPhone);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const placeholder = useMemo(() => {
        return mode === "id"
            ? CEK_LAMARAN_UI.placeholder.id
            : CEK_LAMARAN_UI.placeholder.phone;
    }, [mode]);

    const activeValue = mode === "id" ? idValue : phoneValue;

    const setActiveValue = (value) => {
        setErrorMsg("");

        if (mode === "id") {
            setIdValue(value);
            return;
        }

        setPhoneValue(value);
    };

    const handleChangeMode = (nextMode) => {
        setErrorMsg("");
        setMode(nextMode);

        if (nextMode === "phone" && !phoneValue && suggestedPhone) {
            setPhoneValue(suggestedPhone);
        }

        if (nextMode === "id" && !idValue && suggestedId) {
            setIdValue(suggestedId);
        }
    };

    const submit = async () => {
        setErrorMsg("");

        const raw = String(activeValue || "").trim();

        if (!raw) {
            setErrorMsg(CEK_LAMARAN_UI.emptyError);
            return;
        }

        try {
            setIsLoading(true);
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });

            if (mode === "id") {
                const lamaran = await searchLamaranById(raw);

                if (!lamaran?.applicationId) {
                    setErrorMsg(CEK_LAMARAN_UI.notFoundError);
                    return;
                }

                setLocalStorageItem(LAST_SEARCH_ID_KEY, lamaran.applicationId);
                navigate(`/cek-lamaran/status/${lamaran.applicationId}`);
                return;
            }

            const phone = normalizePhone(raw);
            const list = await searchLamaranByWhatsapp(phone);

            if (!list.length) {
                setErrorMsg(CEK_LAMARAN_UI.notFoundError);
                return;
            }

            setLocalStorageItem(LAST_SEARCH_PHONE_KEY, raw);

            if (list.length === 1) {
                navigate(`/cek-lamaran/status/${list[0].applicationId}`);
                return;
            }

            navigate(`/cek-lamaran/status?phone=${encodeURIComponent(phone)}`);
        } catch (err) {
            setErrorMsg(err?.message || CEK_LAMARAN_UI.notFoundError);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return {
        mode,
        setMode,
        handleChangeMode,
        placeholder,
        activeValue,
        setActiveValue,
        errorMsg,
        onSubmit,
        suggestedPhone,
        isLoading,
    };
}