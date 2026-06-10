import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";

import ExportFileNameModal from "./ExportFileNameModal";
import ReportTable from "./ReportTable";

function sanitizeFileName(value = "") {
    return String(value || "")
        .trim()
        .replace(/[\\/:*?"<>|]/g, "-")
        .replace(/\s+/g, " ")
        .replace(/-+/g, "-");
}

function getDefaultFileName(meta = {}) {
    const rawDate = meta.exportedAt || "";
    const safeDate = sanitizeFileName(rawDate).replace(/\s+/g, "-");

    return safeDate
        ? `Laporan Data Archiving Seven INC ${safeDate}`
        : "Laporan Data Archiving Seven INC";
}

export default function ReportPreview({
    open = false,
    onClose,
    archives = [],
    meta = {},
    onOpenArchive,
}) {
    const closeBtnRef = useRef(null);
    const reportRef = useRef(null);

    const [fileNameModalOpen, setFileNameModalOpen] = useState(false);

    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                if (fileNameModalOpen) {
                    setFileNameModalOpen(false);
                    return;
                }

                onClose?.();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        const timer = setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 0);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
            clearTimeout(timer);
        };
    }, [open, onClose, fileNameModalOpen]);

    if (!open) return null;

    const handleExportReport = (fileName) => {
        const cleanFileName = sanitizeFileName(fileName) || getDefaultFileName(meta);
        const reportHtml = reportRef.current?.innerHTML || "";

        const printWindow = window.open("", "_blank", "width=1100,height=800");

        if (!printWindow) return;

        printWindow.document.write(`
            <!doctype html>
            <html>
                <head>
                    <title>${cleanFileName}</title>
                    <style>
                        * {
                            box-sizing: border-box;
                        }

                        body {
                            font-family: Arial, sans-serif;
                            margin: 32px;
                            color: #111827;
                        }

                        .report-header {
                            margin-bottom: 24px;
                        }

                        .report-eyebrow {
                            font-size: 11px;
                            letter-spacing: 4px;
                            text-transform: uppercase;
                            font-weight: 700;
                            color: #dc2626;
                            margin: 0 0 8px;
                        }

                        .report-title {
                            font-size: 24px;
                            font-weight: 800;
                            margin: 0;
                        }

                        .report-subtitle {
                            font-size: 12px;
                            color: #4b5563;
                            margin: 8px 0 0;
                            line-height: 1.7;
                        }

                        .report-table-wrap {
                            margin-top: 24px;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                            font-size: 12px;
                        }

                        th {
                            background: #f9fafb;
                            color: #4b5563;
                            font-size: 10px;
                            text-transform: uppercase;
                            letter-spacing: 0.08em;
                        }

                        th,
                        td {
                            border: 1px solid #e5e7eb;
                            padding: 10px;
                            text-align: left;
                            vertical-align: top;
                        }

                        .report-footer {
                            margin-top: 28px;
                            display: flex;
                            justify-content: flex-end;
                        }

                        .signature {
                            width: 220px;
                            text-align: center;
                            font-size: 12px;
                        }

                        .signature-space {
                            height: 72px;
                        }

                        @page {
                            size: A4 landscape;
                            margin: 16mm;
                        }
                    </style>
                </head>
                <body>
                    ${reportHtml}
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setFileNameModalOpen(false);

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 300);
    };

    return createPortal(
        <>
            <div className="fixed inset-0 z-[9999] bg-black/45 p-4 backdrop-blur-sm">
                <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl">
                    <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-5">
                        <div>
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-red-600">
                                Preview Laporan
                            </p>

                            <h2 className="mt-2 text-xl font-extrabold text-neutral-900">
                                Export Data Archiving
                            </h2>

                            <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                                Laporan hanya memuat data pelamar yang diterima dan tersimpan
                                di Data Archiving.
                            </p>
                        </div>

                        <button
                            ref={closeBtnRef}
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                            aria-label="Tutup preview laporan"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-neutral-50 px-5 py-5">
                        <div
                            ref={reportRef}
                            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                        >
                            <div className="report-header">
                                <p className="report-eyebrow text-[11px] font-extrabold uppercase tracking-[0.35em] text-red-600">
                                    Seven INC
                                </p>

                                <h1 className="report-title text-2xl font-extrabold text-neutral-900">
                                    {meta.title || "Laporan Data Pelamar Diterima"}
                                </h1>

                                <p className="report-subtitle mt-2 max-w-3xl text-[12px] leading-relaxed text-neutral-500">
                                    Laporan ini berisi data pelamar yang telah diterima
                                    melalui sistem E-Recruitment Seven INC.
                                </p>
                            </div>

                            <div className="report-table-wrap mt-6">
                                <ReportTable
                                    archives={archives}
                                    onOpenArchive={onOpenArchive}
                                />
                            </div>

                            <div className="report-footer mt-8 flex justify-end">
                                <div className="signature text-center text-[12px] text-neutral-700">
                                    <p>Yogyakarta, {meta.exportedAt || "-"}</p>
                                    <div className="signature-space h-20" />
                                    <p className="font-bold text-neutral-900">
                                        HRD Seven INC
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-2 border-t border-neutral-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-[12px] font-bold text-neutral-700 transition hover:bg-neutral-50"
                        >
                            Batal
                        </button>

                        <button
                            type="button"
                            onClick={() => setFileNameModalOpen(true)}
                            className={[
                                "inline-flex cursor-pointer items-center justify-center gap-2",
                                "rounded-full bg-red-600 px-5 py-2.5",
                                "text-[12px] font-bold text-white",
                                "transition hover:bg-red-700 active:scale-[0.98]",
                            ].join(" ")}
                        >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            <ExportFileNameModal
                open={fileNameModalOpen}
                defaultFileName={getDefaultFileName(meta)}
                onClose={() => setFileNameModalOpen(false)}
                onSubmit={handleExportReport}
            />
        </>,
        document.body
    );
}