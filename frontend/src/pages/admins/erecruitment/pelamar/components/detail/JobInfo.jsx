import { Archive, Briefcase, CalendarClock, TimerReset } from "lucide-react";

import DeadlineBadge from "../../../../../../components/admin/pelamar/badge/DeadlineBadge";

function InfoRow({ icon: Icon, label, value, children }) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-700">
                <Icon className="h-4 w-4" aria-hidden="true" />
            </div>

            <div>
                <p className="text-[11px] font-semibold text-neutral-500">
                    {label}
                </p>

                {children || (
                    <p className="mt-1 text-[12px] font-bold leading-relaxed text-neutral-900">
                        {value || "-"}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function JobInfo({ applicant }) {
    const archiveDateLabel =
        applicant.archivedAtLabel && applicant.archivedAtLabel !== "-"
            ? applicant.archivedAtLabel
            : applicant.acceptedAtLabel;

    const startDateLabel =
        applicant.startDateLabel && applicant.startDateLabel !== "-"
            ? applicant.startDateLabel
            : "-";

    return (
        <section>
            <h3 className="text-[13px] font-extrabold text-neutral-900">
                Informasi Lamaran
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3">
                <InfoRow
                    icon={Briefcase}
                    label="Posisi Dilamar"
                    value={applicant.jobTitle}
                />

                <InfoRow
                    icon={CalendarClock}
                    label="Tanggal Daftar"
                    value={applicant.appliedAtLabel}
                />

                <InfoRow icon={TimerReset} label="Batas Seleksi">
                    <div className="mt-2">
                        <DeadlineBadge
                            level={applicant.deadlineLevel}
                            label={applicant.deadlineLabel}
                        />
                        <p className="mt-2 text-[11px] text-neutral-500">
                            Expired pada {applicant.expiredAtLabel}
                        </p>
                    </div>
                </InfoRow>

                {applicant.status === "accepted" && applicant.isArchived ? (
                    <InfoRow icon={Archive} label="Data Archiving">
                        <p className="mt-1 text-[12px] font-bold leading-relaxed text-neutral-900">
                            Tersimpan di Data Archiving
                        </p>

                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                            Data pelamar diterima otomatis masuk ke arsip pada{" "}
                            {archiveDateLabel || "-"}.
                        </p>

                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                            Mulai kerja:{" "}
                            <span className="font-semibold text-neutral-700">
                                {startDateLabel}
                            </span>
                        </p>
                    </InfoRow>
                ) : null}
            </div>
        </section>
    );
}