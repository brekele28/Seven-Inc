import { useMemo, useState } from "react";
import { Eye, FileText } from "lucide-react";

import { normalizeApiFileUrl } from "../../../api/client/ApiClient";
import CvPreviewModal from "./CvPreviewModal";

export default function CvPreviewButton({
    fileName = "CV Pelamar.pdf",
    fileUrl = "",
    title = "Preview CV Pelamar",
    label = "Lihat CV",
    compact = false,
    onPreview,
}) {
    const [open, setOpen] = useState(false);

    const normalizedFileUrl = useMemo(() => {
        return normalizeApiFileUrl(fileUrl);
    }, [fileUrl]);

    const hasFile = Boolean(normalizedFileUrl && normalizedFileUrl !== "#");

    const handleClick = () => {
        if (!hasFile) return;

        if (typeof onPreview === "function") {
            onPreview({
                fileName,
                fileUrl: normalizedFileUrl,
                title,
            });
            return;
        }

        setOpen(true);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                disabled={!hasFile}
                className={[
                    "inline-flex cursor-pointer items-center justify-center gap-2",
                    "rounded-full border border-white/60 bg-white/55",
                    compact ? "px-4 py-2" : "px-5 py-2.5",
                    "text-[12px] font-black text-slate-700",
                    "shadow-[0_14px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]",
                    "backdrop-blur-xl transition",
                    hasFile
                        ? "hover:bg-white/80 active:scale-[0.98]"
                        : "cursor-not-allowed opacity-60",
                ].join(" ")}
                title={hasFile ? "Preview CV" : "File CV belum tersedia"}
            >
                {compact ? (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <FileText className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                )}
                {label}
            </button>

            <CvPreviewModal
                open={open}
                title={title}
                fileName={fileName}
                fileUrl={normalizedFileUrl}
                onClose={() => setOpen(false)}
            />
        </>
    );
}