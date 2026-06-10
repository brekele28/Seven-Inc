import { Archive, Briefcase, CalendarCheck, CalendarDays, FileText } from "lucide-react";

import CvPreviewButton from "../../../../../../components/admin/cv-preview/CvPreviewButton";

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div
            className={[
                "flex items-start gap-3 rounded-2xl border border-white/55",
                "bg-zinc-50/70 px-4 py-3 backdrop-blur-xl",
                "shadow-[0_12px_30px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)]",
            ].join(" ")}
        >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/55 text-slate-700">
                <Icon className="h-4 w-4" aria-hidden="true" />
            </div>

            <div>
                <p className="text-[11px] font-semibold text-slate-500">
                    {label}
                </p>

                <p className="mt-1 text-[12px] font-black leading-relaxed text-slate-900">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}

export default function ArchiveInfo({ archive, onPreviewCv }) {
    const cvName = archive?.cvName || "CV Pelamar.pdf";
    const cvUrl = archive?.cvUrl || "#";

    return (
        <section>
            <h3 className="text-[13px] font-extrabold text-neutral-900">
                Informasi Arsip
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3">
                <InfoRow
                    icon={Briefcase}
                    label="Posisi Diterima"
                    value={archive.jobTitle}
                />

                <InfoRow
                    icon={CalendarCheck}
                    label="Tanggal Diterima"
                    value={archive.acceptedAtLabel}
                />

                <InfoRow
                    icon={CalendarDays}
                    label="Tanggal Mulai Kerja"
                    value={archive.startDateLabel}
                />

                <InfoRow
                    icon={Archive}
                    label="Tanggal Arsip"
                    value={archive.archivedAtLabel}
                />

                <div
                    className={[
                        "rounded-[24px] border border-white/55",
                        "bg-zinc-50/70 px-4 py-4 backdrop-blur-xl",
                        "shadow-[0_18px_48px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.75)]",
                    ].join(" ")}
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50/85 text-red-600">
                                <FileText className="h-5 w-5" aria-hidden="true" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-[13px] font-black tracking-[-0.03em] text-slate-900">
                                    {cvName}
                                </p>

                                <p className="mt-1 text-[12px] text-slate-500">
                                    Dokumen CV / portfolio pelamar.
                                </p>
                            </div>
                        </div>

                        <CvPreviewButton
                            fileName={cvName}
                            fileUrl={cvUrl}
                            title={`Preview CV - ${archive?.fullName || "Pelamar"}`}
                            label="Lihat CV"
                            compact
                            onPreview={onPreviewCv}
                        />
                    </div>
                </div>

                {archive.note ? (
                    <div className="rounded-2xl border border-white/55 bg-zinc-50/70 px-4 py-3 backdrop-blur-xl">
                        <p className="text-[11px] font-semibold text-slate-500">
                            Catatan
                        </p>

                        <p className="mt-1 text-[12px] leading-relaxed text-slate-700">
                            {archive.note}
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
}