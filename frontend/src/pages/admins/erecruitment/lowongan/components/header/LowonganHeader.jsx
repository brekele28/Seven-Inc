import {
    BriefcaseBusiness,
    CheckCircle2,
    FilePenLine,
    Plus,
    TimerOff,
} from "lucide-react";

function MiniStat({ icon: Icon, label, value, tone = "neutral" }) {
    const toneClass = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-600",
        slate: "bg-slate-50 text-slate-600",
        amber: "bg-amber-50 text-amber-600",
        neutral: "bg-neutral-100 text-neutral-700",
    };

    return (
        <div className="rounded-3xl border border-neutral-200 bg-white px-4 py-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold text-neutral-500">
                        {label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-neutral-950">
                        {value}
                    </p>
                </div>

                <div
                    className={[
                        "flex h-10 w-10 items-center justify-center rounded-2xl",
                        toneClass[tone] || toneClass.neutral,
                    ].join(" ")}
                >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}

export default function LowonganHeader({ stats, onCreate }) {
    return (
        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.07)]">
            <div
                className="relative px-6 py-7 lg:px-8"
                style={{
                    background:
                        "radial-gradient(70% 80% at 18% 0%, rgba(239,68,68,0.10) 0%, rgba(59,130,246,0.06) 44%, rgba(255,255,255,0) 72%)",
                }}
            >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.45em] text-red-600">
                            E-Recruitment
                        </p>

                        <h1 className="mt-4 text-[28px] font-black leading-tight text-neutral-950 md:text-[34px]">
                            Kelola Lowongan
                        </h1>

                        <p className="mt-3 max-w-2xl text-[13px] leading-7 text-neutral-600">
                            Buat lowongan baru, atur masa buka dan tutup, kelola detail
                            kualifikasi, serta pastikan posisi yang tampil di halaman user selalu
                            rapi dan relevan.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onCreate}
                        className={[
                            "inline-flex w-fit items-center justify-center gap-2 rounded-full",
                            "bg-red-500 px-6 py-3 text-[13px] font-extrabold text-white",
                            "shadow-[0_18px_35px_-18px_rgba(239,68,68,0.9)]",
                            "transition hover:-translate-y-0.5 hover:bg-red-600 active:translate-y-0 active:scale-[0.99]",
                            "focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300/40",
                        ].join(" ")}
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Tambah Loker
                    </button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MiniStat
                        icon={BriefcaseBusiness}
                        label="Total Lowongan"
                        value={stats?.total || 0}
                        tone="blue"
                    />
                    <MiniStat
                        icon={CheckCircle2}
                        label="Lowongan Aktif"
                        value={stats?.active || 0}
                        tone="green"
                    />
                    <MiniStat
                        icon={FilePenLine}
                        label="Draft"
                        value={stats?.draft || 0}
                        tone="slate"
                    />
                    <MiniStat
                        icon={TimerOff}
                        label="Expired"
                        value={stats?.expired || 0}
                        tone="amber"
                    />
                </div>
            </div>
        </div>
    );
}