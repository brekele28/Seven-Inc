import { FileText } from "lucide-react";

import CvPreviewButton from "../../../../../../components/admin/cv-preview/CvPreviewButton";

export default function DocumentCard({ applicant, onPreviewCv }) {
    const cvName = applicant?.cvName || "CV Pelamar.pdf";
    const cvUrl = applicant?.cvUrl || "#";

    return (
        <section>
            <h3 className="text-[13px] font-extrabold text-neutral-900">
                Dokumen Pelamar
            </h3>

            <div
                className={[
                    "mt-4 rounded-[24px] border border-white/55",
                    "bg-zinc-50/70 p-4 backdrop-blur-xl",
                    "shadow-[0_18px_48px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.75)]",
                ].join(" ")}
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50/80 text-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                            <FileText className="h-5 w-5" aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-[14px] font-black tracking-[-0.03em] text-slate-900">
                                {cvName}
                            </p>

                            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                                CV / Portfolio yang diunggah oleh pelamar.
                            </p>
                        </div>
                    </div>

                    <CvPreviewButton
                        fileName={cvName}
                        fileUrl={cvUrl}
                        title={`Preview CV - ${applicant?.fullName || "Pelamar"}`}
                        label="Lihat CV"
                        onPreview={onPreviewCv}
                    />
                </div>
            </div>
        </section>
    );
}