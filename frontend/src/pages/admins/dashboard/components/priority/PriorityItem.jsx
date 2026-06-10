import { AlertTriangle, Bell, Info } from "lucide-react";

export default function PriorityItem({ item }) {
    const levelMap = {
        urgent: {
            icon: AlertTriangle,
            className: "bg-red-50 text-red-600 border-red-100",
        },
        warning: {
            icon: Bell,
            className: "bg-amber-50 text-amber-600 border-amber-100",
        },
        info: {
            icon: Info,
            className: "bg-blue-50 text-blue-600 border-blue-100",
        },
    };

    const config = levelMap[item.level] || levelMap.info;
    const Icon = config.icon;

    return (
        <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4">
            <div
                className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border",
                    config.className,
                ].join(" ")}
            >
                <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
                <p className="text-[13px] font-extrabold text-neutral-900">
                    {item.title}
                </p>

                <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                    {item.description}
                </p>
            </div>
        </div>
    );
}