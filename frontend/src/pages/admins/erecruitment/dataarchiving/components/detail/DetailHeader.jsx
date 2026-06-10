import { X } from "lucide-react";

export default function DetailHeader({ archive, onClose }) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-5">
            <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-red-600">
                    Detail Arsip
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-neutral-900">
                    {archive.fullName}
                </h2>

                <p className="mt-1 text-[12px] font-semibold tracking-[0.14em] text-neutral-500">
                    {archive.applicationId}
                </p>

                <div className="mt-3 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700">
                    Diterima
                </div>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Tutup detail arsip"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}