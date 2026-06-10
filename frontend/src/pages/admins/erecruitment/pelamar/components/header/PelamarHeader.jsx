import { ShieldCheck } from "lucide-react";

export default function PelamarHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.35em] text-red-600">
                    E-Recruitment
                </p>

                <h1 className="mt-3 text-2xl font-extrabold text-neutral-900 md:text-3xl">
                    Data Pelamar
                </h1>

                <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-neutral-500">
                    Kelola lamaran masuk, review data pelamar, lihat CV, dan perbarui
                    status rekrutmen secara transparan.
                </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-bold text-emerald-700">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Anti-Ghosting
            </div>
        </div>
    );
}