import { X } from "lucide-react";
import StatusBadge from "../../../../../../components/admin/pelamar/badge/StatusBadge";

export default function DetailHeader({ applicant, onClose }) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-5">
            <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-red-600">
                    Detail Pelamar
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-neutral-900">
                    {applicant.fullName}
                </h2>

                <p className="mt-1 text-[12px] font-semibold tracking-[0.14em] text-neutral-500">
                    {applicant.applicationId}
                </p>

                <div className="mt-3">
                    <StatusBadge
                        status={applicant.status}
                        label={applicant.statusLabel}
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Tutup detail pelamar"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}