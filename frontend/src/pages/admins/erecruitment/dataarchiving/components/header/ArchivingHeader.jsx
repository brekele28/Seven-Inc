import { Archive, ShieldCheck } from "lucide-react";
import ReportButton from "../../../../../../components/admin/archiving/report/ReportButton";

export default function ArchivingHeader({ onExport }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.35em] text-red-600">
                    E-Recruitment
                </p>

                <h1 className="mt-3 text-2xl font-extrabold text-neutral-900 md:text-3xl">
                    Data Archiving
                </h1>

                <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-neutral-500">
                    Arsip pelamar yang telah diterima melalui sistem E-Recruitment
                    Seven INC sebagai laporan penerimaan perusahaan.
                </p>

                <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[12px] font-bold text-blue-700">
                    <Archive className="h-4 w-4" aria-hidden="true" />
                    Arsip Penerimaan
                </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-bold text-emerald-700">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Data Tersimpan
                </div>

                <ReportButton onClick={onExport} label="Export" />
            </div>
        </div>
    );
}