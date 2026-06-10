import { Briefcase, Hash, Phone, Mail } from "lucide-react";
import { STATUS_UI } from "../../../../../services/user/statuslamaran/data/statuslamaran.ui.dummy";

function Row({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-[2px] flex h-9 w-9 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
                <Icon className="h-4 w-4 text-neutral-700" aria-hidden="true" />
            </div>

            <div>
                <p className="text-[11px] font-semibold text-neutral-500">
                    {label}
                </p>

                <p className="text-[12px] font-extrabold leading-relaxed text-neutral-900">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}

export default function SummaryCard({ app }) {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div
                className="px-5 py-5 md:px-8 md:py-7"
                style={{
                    background:
                        "radial-gradient(60% 70% at 30% 0%, rgba(239,68,68,0.10) 0%, rgba(59,130,246,0.06) 35%, rgba(255,255,255,0) 70%)",
                }}
            >
                <p className="text-[12px] font-extrabold text-neutral-900">
                    {STATUS_UI.single.summaryTitle}
                </p>

                <p className="mt-1 text-[12px] leading-[1.75] text-neutral-600">
                    {STATUS_UI.single.summarySubtitle}
                </p>
            </div>

            <div className="px-5 py-5 md:px-8 md:py-7">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Row icon={Briefcase} label="Posisi" value={app?.jobTitle} />
                    <Row icon={Hash} label="ID Lamaran" value={app?.applicationId} />
                    <Row
                        icon={Phone}
                        label="No. HP"
                        value={app?.phoneLabel || app?.phone}
                    />
                    <Row icon={Mail} label="Email" value={app?.email} />
                </div>
            </div>
        </div>
    );
}