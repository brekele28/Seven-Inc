import { useEffect, useMemo, useState } from "react";
import ApplyFormSection from "./ApplyFormSection";

import {
    validateEmail,
    validatePhone,
    validateRequired,
} from "../../logic/apply.validation";

const FIELD_ALIASES = {
    fullName: ["nama_lengkap", "fullName", "name", "nama"],
    email: ["email"],
    phone: ["no_whatsapp", "phone", "no_hp", "whatsapp", "noWhatsapp", "phoneNumber"],
    gender: ["jenis_kelamin", "gender"],
    birthPlace: ["tempat_lahir", "birthPlace"],
    birthDate: ["tanggal_lahir", "birthDate"],
    address: ["alamat", "address"],
    cvPdf: ["cv_pdf", "cvPdf", "cv", "file", "dokumen"],
};

function isFile(value) {
    return typeof File !== "undefined" && value instanceof File;
}

function isFileList(value) {
    return typeof FileList !== "undefined" && value instanceof FileList;
}

function getFieldValueByAliases(values, aliases = []) {
    for (const key of aliases) {
        const value = values?.[key];

        if (value === undefined || value === null) continue;

        if (isFile(value)) return value;

        if (isFileList(value)) {
            return value.length ? value[0] : "";
        }

        if (Array.isArray(value) && value.length) {
            return value[0];
        }

        if (String(value).trim() !== "") {
            return value;
        }
    }

    return "";
}

function buildInitialValues(sections = []) {
    const values = {};

    for (const section of sections) {
        const fields = Array.isArray(section.fields) ? section.fields : [];

        for (const field of fields) {
            values[field.name] = field.type === "file" ? null : "";
        }
    }

    return values;
}

function normalizePayload(values = {}) {
    const fullName = getFieldValueByAliases(values, FIELD_ALIASES.fullName);
    const email = getFieldValueByAliases(values, FIELD_ALIASES.email);
    const phone = getFieldValueByAliases(values, FIELD_ALIASES.phone);
    const gender = getFieldValueByAliases(values, FIELD_ALIASES.gender);
    const birthPlace = getFieldValueByAliases(values, FIELD_ALIASES.birthPlace);
    const birthDate = getFieldValueByAliases(values, FIELD_ALIASES.birthDate);
    const address = getFieldValueByAliases(values, FIELD_ALIASES.address);
    const cvPdf = getFieldValueByAliases(values, FIELD_ALIASES.cvPdf) || null;

    return {
        ...values,

        fullName,
        email,
        phone,
        gender,
        birthPlace,
        birthDate,
        address,
        cvPdf,

        nama_lengkap: fullName,
        no_whatsapp: phone,
        jenis_kelamin: gender,
        tempat_lahir: birthPlace,
        tanggal_lahir: birthDate,
        alamat: address,
        cv_pdf: cvPdf,
    };
}

function setAliasError(nextErrors, values, aliases, message) {
    const existingKey = aliases.find((key) => key in values) || aliases[0];
    nextErrors[existingKey] = nextErrors[existingKey] || message;
}

function isPhoneField(name) {
    return FIELD_ALIASES.phone.includes(name);
}

function isCvField(name) {
    return FIELD_ALIASES.cvPdf.includes(name);
}

function buildSubmitValues(formElement, values) {
    const formData = new FormData(formElement);
    const formValues = {};

    for (const [key, value] of formData.entries()) {
        if (isFile(value) && value.size === 0) continue;
        formValues[key] = value;
    }

    return {
        ...values,
        ...formValues,
    };
}

export default function ApplyForm({
    template,
    onSubmit,
    submitting,
    submitState,
}) {
    const sections = useMemo(() => {
        return Array.isArray(template?.sections) ? template.sections : [];
    }, [template]);

    const [values, setValues] = useState(() => buildInitialValues(sections));
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setValues(buildInitialValues(sections));
        setErrors({});
    }, [sections]);

    const setFieldValue = (name, nextValue) => {
        setValues((prev) => {
            const nextValues = {
                ...prev,
                [name]: nextValue,
            };

            if (isPhoneField(name)) {
                for (const alias of FIELD_ALIASES.phone) {
                    nextValues[alias] = nextValue;
                }
            }

            if (isCvField(name)) {
                for (const alias of FIELD_ALIASES.cvPdf) {
                    nextValues[alias] = nextValue;
                }
            }

            return nextValues;
        });

        setErrors((prev) => {
            const nextErrors = {
                ...prev,
                [name]: "",
            };

            if (isPhoneField(name)) {
                for (const alias of FIELD_ALIASES.phone) {
                    nextErrors[alias] = "";
                }
            }

            if (isCvField(name)) {
                for (const alias of FIELD_ALIASES.cvPdf) {
                    nextErrors[alias] = "";
                }
            }

            return nextErrors;
        });
    };

    const validate = (submitValues) => {
        const nextErrors = {};

        for (const section of sections) {
            const fields = Array.isArray(section.fields) ? section.fields : [];

            for (const field of fields) {
                const value = submitValues[field.name];

                if (field.required) {
                    const isValidRequired =
                        field.type === "file"
                            ? Boolean(value)
                            : validateRequired(value);

                    if (!isValidRequired) {
                        nextErrors[field.name] = "Wajib diisi.";
                    }
                }

                if (field.type === "email" && value) {
                    if (!validateEmail(value)) {
                        nextErrors[field.name] = "Format email tidak valid.";
                    }
                }

                if (isPhoneField(field.name) && value) {
                    if (!validatePhone(value)) {
                        nextErrors[field.name] =
                            "Nomor tidak valid. Gunakan angka, contoh 081234567891.";
                    }
                }
            }
        }

        const normalized = normalizePayload(submitValues);

        if (!validateRequired(normalized.fullName)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.fullName,
                "Nama lengkap wajib diisi."
            );
        }

        if (!validateRequired(normalized.email)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.email,
                "Email wajib diisi."
            );
        }

        if (!validateRequired(normalized.phone)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.phone,
                "Nomor WhatsApp wajib diisi."
            );
        }

        if (!validateRequired(normalized.gender)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.gender,
                "Jenis kelamin wajib dipilih."
            );
        }

        if (!validateRequired(normalized.birthPlace)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.birthPlace,
                "Tempat lahir wajib diisi."
            );
        }

        if (!validateRequired(normalized.birthDate)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.birthDate,
                "Tanggal lahir wajib diisi."
            );
        }

        if (!validateRequired(normalized.address)) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.address,
                "Alamat wajib diisi."
            );
        }

        if (!normalized.cvPdf) {
            setAliasError(
                nextErrors,
                submitValues,
                FIELD_ALIASES.cvPdf,
                "CV wajib diupload."
            );
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) return;
        if (submitState?.status === "success") return;

        const submitValues = buildSubmitValues(e.currentTarget, values);
        const isValid = validate(submitValues);

        if (!isValid) return;

        const payload = normalizePayload(submitValues);

        await onSubmit?.(payload);
    };

    return (
        <form id="apply-form" onSubmit={handleSubmit} className="space-y-6">
            {sections.map((section) => (
                <ApplyFormSection
                    key={section.id}
                    section={section}
                    values={values}
                    errors={errors}
                    onChange={setFieldValue}
                />
            ))}
        </form>
    );
}