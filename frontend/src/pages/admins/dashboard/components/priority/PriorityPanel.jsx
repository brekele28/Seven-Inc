import { AlertTriangle, Bell, Info } from "lucide-react";

const levelMap = {
    urgent: {
        icon: AlertTriangle,
        box: "border-red-100 bg-red-50 text-red-600",
    },
    warning: {
        icon: Bell,
        box: "border-amber-100 bg-amber-50 text-amber-600",
    },
    info: {
        icon: Info,
        box: "border-blue-100 bg-blue-50 text-blue-600",
    },
};

export default function PriorityPanel({ priorities = [] }) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-5 py-5">
                <h2 className="text-[16px] font-extrabold text-neutral-900">
                    Prioritas Hari Ini
                </h2>
                <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                    Daftar tindakan penting yang perlu segera diproses HRD.
                </p>
            </div>

            <div className="space-y-3 px-5 py-5">
                {priorities.map((item) => {
                    const config = levelMap[item.level] || levelMap.info;
                    const Icon = config.icon;

                    return (
                        <div
                            key={item.id}
                            className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4 transition hover:bg-neutral-50"
                        >
                            <div
                                className={[
                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
                                    config.box,
                                ].join(" ")}
                            >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                            </div>

                            <div>
                                <h3 className="text-[13px] font-extrabold text-neutral-900">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}