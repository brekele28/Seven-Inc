import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, FileText, X } from "lucide-react";

import { normalizeApiFileUrl } from "../../../api/client/ApiClient";

function isPdfUrl(url = "") {
    return String(url || "").toLowerCase().split("?")[0].includes(".pdf");
}

function buildPdfPreviewUrl(url = "") {
    const normalizedUrl = normalizeApiFileUrl(url);

    if (!normalizedUrl || normalizedUrl === "#") return "";

    if (normalizedUrl.includes("#")) return normalizedUrl;

    return `${normalizedUrl}#toolbar=1&navpanes=0&scrollbar=1`;
}

export default function CvPreviewModal({
    open = false,
    title = "Preview CV",
    fileName = "CV Pelamar.pdf",
    fileUrl = "",
    onClose,
}) {
    const normalizedFileUrl = useMemo(() => {
        return normalizeApiFileUrl(fileUrl);
    }, [fileUrl]);

    const canPreview = Boolean(normalizedFileUrl && normalizedFileUrl !== "#");
    const isPdf = isPdfUrl(normalizedFileUrl);
    const previewUrl = buildPdfPreviewUrl(normalizedFileUrl);

    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    const modal = (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/45 px-3 py-3 backdrop-blur-2xl md:px-5 md:py-5">
            <button
                type="button"
                aria-label="Tutup preview CV"
                onClick={onClose}
                className="absolute inset-0 cursor-default"
            />

            <section
                className={[
                    "relative flex h-[94vh] w-[97vw] max-w-[1600px] flex-col overflow-hidden",
                    "rounded-[30px] border border-white/45",
                    "bg-zinc-50/80 shadow-[0_30px_100px_rgba(15,23,42,0.24),0_10px_38px_rgba(15,23,42,0.14)]",
                    "backdrop-blur-2xl",
                ].join(" ")}
            >
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-90"
                    style={{
                        background:
                            "radial-gradient(70% 90% at 16% 0%, rgba(16,185,129,0.18) 0%, rgba(99,102,241,0.12) 36%, rgba(244,244,245,0) 76%)",
                    }}
                />

                <header className="relative flex flex-col gap-4 border-b border-white/55 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/60 bg-white/55 text-emerald-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                            <FileText className="h-5 w-5" aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-700">
                                CV Preview
                            </p>

                            <h2 className="mt-2 truncate text-[20px] font-black tracking-[-0.04em] text-slate-900 md:text-[24px]">
                                {title}
                            </h2>

                            <p className="mt-1 truncate text-[12px] font-semibold text-slate-500">
                                {fileName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        {canPreview ? (
                            <a
                                href={normalizedFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={[
                                    "inline-flex cursor-pointer items-center justify-center gap-2",
                                    "rounded-full border border-white/60 bg-white/60 px-4 py-2.5",
                                    "text-[12px] font-extrabold text-slate-700",
                                    "shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl",
                                    "transition hover:bg-white/80 active:scale-[0.98]",
                                ].join(" ")}
                            >
                                <ExternalLink className="h-4 w-4" />
                                Buka Tab
                            </a>
                        ) : null}

                        <button
                            type="button"
                            onClick={onClose}
                            className={[
                                "inline-flex h-10 w-10 cursor-pointer items-center justify-center",
                                "rounded-full border border-white/60 bg-white/60",
                                "text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl",
                                "transition hover:bg-white/85 active:scale-95",
                            ].join(" ")}
                            aria-label="Tutup"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                <div className="relative flex-1 bg-zinc-100/45 p-3 md:p-5">
                    {!canPreview ? (
                        <div className="flex h-full items-center justify-center rounded-[24px] border border-dashed border-slate-300/70 bg-white/45 backdrop-blur-xl">
                            <div className="max-w-md text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                                    <FileText className="h-6 w-6" />
                                </div>

                                <p className="mt-4 text-[14px] font-black text-slate-900">
                                    File CV belum tersedia
                                </p>

                                <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
                                    URL dokumen belum dikirim dari API atau file tidak ditemukan.
                                </p>
                            </div>
                        </div>
                    ) : isPdf ? (
                        <iframe
                            title={fileName}
                            src={previewUrl}
                            className={[
                                "h-full w-full rounded-[24px] border border-white/70",
                                "bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_18px_50px_rgba(15,23,42,0.12)]",
                            ].join(" ")}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center rounded-[24px] border border-white/60 bg-white/55 backdrop-blur-xl">
                            <div className="max-w-md text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                    <FileText className="h-6 w-6" />
                                </div>

                                <p className="mt-4 text-[14px] font-black text-slate-900">
                                    Preview langsung belum tersedia
                                </p>

                                <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
                                    Browser hanya bisa menampilkan preview langsung untuk file PDF.
                                    Silakan buka file di tab baru.
                                </p>

                                <a
                                    href={normalizedFileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={[
                                        "mt-5 inline-flex cursor-pointer items-center justify-center gap-2",
                                        "rounded-full bg-emerald-600 px-5 py-3",
                                        "text-[12px] font-black text-white",
                                        "shadow-[0_16px_36px_rgba(16,185,129,0.22)]",
                                        "transition hover:bg-emerald-700 active:scale-[0.98]",
                                    ].join(" ")}
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Buka File
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );

    return createPortal(modal, document.body);
}