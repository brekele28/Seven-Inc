import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import ModalHeader from "./components/header/ModalHeader";
import ModalFooter from "./components/footer/ModalFooter";
import ApplyForm from "./components/form/ApplyForm";

import { getApplyTemplate } from "../../../../services/user/detailloker/modal/repository/applyTemplate.repository";
import { createApplication } from "../../../../services/user/lamaran/repository/lamaran.repository";

function getFirstErrorMessage(error) {
    const errors = error?.errors?.errors || error?.errors;

    if (errors && typeof errors === "object") {
        const firstValue = Object.values(errors).flat()?.[0];

        if (firstValue) return firstValue;
    }

    return (
        error?.data?.error ||
        error?.error ||
        error?.data?.message ||
        error?.message ||
        ""
    );
}

export default function ApplyModal({
    open = false,
    onClose,
    onSuccess,
    jobId = "",
    jobTitle = "Posisi",
    templateKey = "DEFAULT_APPLY",
}) {
    const template = useMemo(() => getApplyTemplate(templateKey), [templateKey]);

    const overlayRef = useRef(null);
    const closeBtnRef = useRef(null);

    const [submitting, setSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState({
        status: "idle",
        message: "",
    });

    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e) => {
            if (e.key === "Escape" && !submitting) {
                onClose?.();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
            clearTimeout(t);
        };
    }, [open, onClose, submitting]);

    useEffect(() => {
        if (!open) {
            setSubmitState({
                status: "idle",
                message: "",
            });
        }
    }, [open]);

    const onOverlayClick = (e) => {
        if (submitting) return;
        if (e.target === overlayRef.current) onClose?.();
    };

    const handleSubmit = async (payload) => {
        setSubmitting(true);
        setSubmitState({
            status: "idle",
            message: "",
        });

        try {
            const rec = await createApplication({
                jobId,
                jobTitle,
                payload,
            });

            const kodeLamaran =
                rec?.applicationId ||
                rec?.kode_lamaran ||
                rec?.kodeLamaran ||
                "";

            if (!kodeLamaran) {
                throw new Error("Lamaran berhasil dikirim, tetapi ID lamaran tidak ditemukan.");
            }

            setSubmitState({
                status: "success",
                message: "Lamaran berhasil dikirim.",
            });

            onClose?.();
            onSuccess?.(kodeLamaran);
        } catch (err) {
            const firstError = getFirstErrorMessage(err);

            setSubmitState({
                status: "error",
                message:
                    firstError ||
                    "Terjadi kendala saat mengirim lamaran. Silakan coba lagi.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (!open) return null;

    return createPortal(
        <div
            ref={overlayRef}
            onMouseDown={onOverlayClick}
            className="
                fixed inset-0 z-999
                flex items-end md:items-center justify-center
                bg-black/45 backdrop-blur-[6px]
                p-0 md:p-6
            "
            aria-modal="true"
            role="dialog"
            aria-label={`Form lamaran untuk ${jobTitle}`}
        >
            <div
                className="
                    relative w-full md:max-w-215
                    rounded-t-[26px] md:rounded-[26px]
                    bg-white
                    shadow-[0_20px_70px_rgba(0,0,0,0.25)]
                    overflow-hidden
                    border border-white/30
                    max-h-[92vh] md:max-h-[92vh]
                    flex flex-col
                "
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div
                    className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(60% 70% at 35% 0%, rgba(239,68,68,0.18) 0%, rgba(59,130,246,0.10) 35%, rgba(255,255,255,0) 70%)",
                    }}
                />

                <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => {
                        if (!submitting) onClose?.();
                    }}
                    disabled={submitting}
                    className="
                        absolute right-4 top-4 z-10
                        inline-flex h-10 w-10 items-center justify-center
                        rounded-full border border-neutral-200 bg-white/90
                        shadow-sm
                        transition hover:bg-neutral-50 active:scale-95
                        disabled:cursor-not-allowed disabled:opacity-60
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50
                    "
                    aria-label="Tutup modal"
                >
                    <X className="h-5 w-5 text-neutral-700" />
                </button>

                <div className="relative flex-1 min-h-0 overflow-y-auto">
                    <ModalHeader
                        title={template.meta?.title}
                        subtitle={template.meta?.subtitle}
                        jobTitle={jobTitle}
                    />

                    <div className="px-5 pb-5 md:px-8 md:pb-8">
                        <ApplyForm
                            template={template}
                            submitting={submitting}
                            submitState={submitState}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>

                <ModalFooter
                    submitting={submitting}
                    submitState={submitState}
                    onCancel={() => {
                        if (!submitting) onClose?.();
                    }}
                />
            </div>
        </div>,
        document.body
    );
}