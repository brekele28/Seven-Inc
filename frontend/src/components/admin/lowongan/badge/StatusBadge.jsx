import { Archive, CheckCircle2, Clock, FilePenLine, TimerOff } from "lucide-react";

const STATUS_MAP = {
    draft: {
        label: "Draft",
        className: "border-slate-200 bg-slate-50 text-slate-700",
        icon: FilePenLine,
    },
    active: {
        label: "Aktif",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        icon: CheckCircle2,
    },
    closed: {
        label: "Ditutup",
        className: "border-neutral-200 bg-neutral-100 text-neutral-700",
        icon: Archive,
    },
    expired: {
        label: "Expired",
        className: "border-amber-200 bg-amber-50 text-amber-700",
        icon: TimerOff,
    },
};

export default function StatusBadge({ status = "draft" }) {
    const config = STATUS_MAP[status] || STATUS_MAP.draft;
    const Icon = config.icon || Clock;

    return (
        <span
            className={[
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
                "text-[11px] font-extrabold",
                config.className,
            ].join(" ")}
        >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {config.label}
        </span>
    );
}