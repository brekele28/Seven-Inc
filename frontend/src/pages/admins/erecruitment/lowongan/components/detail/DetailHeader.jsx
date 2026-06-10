import { Archive, Edit3, Play, Trash2 } from "lucide-react";
import StatusBadge from "../../../../../../components/admin/lowongan/badge/StatusBadge";

function ActionButton({ icon: Icon, label, onClick, variant = "neutral" }) {
    const variantClass = {
        neutral: "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
        red: "border-red-100 bg-red-50 text-red-600 hover:bg-red-100",
        green: "border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5",
                "text-[12px] font-extrabold shadow-sm transition active:scale-[0.98]",
                variantClass[variant] || variantClass.neutral,
            ].join(" ")}
        >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
        </button>
    );
}

export default function DetailHeader({ item, onEdit, onClose, onDelete, onPublish }) {
    if (!item) return null;

    const canClose = item.status === "active";
    const canPublish = item.status === "draft" || item.status === "closed";
    const canDelete = item.status === "closed" || item.status === "expired" || item.status === "draft";

    return (
        <div className="flex flex-col gap-4 border-b border-neutral-100 px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <StatusBadge status={item.status} />

                    <h2 className="mt-3 text-xl font-black leading-tight text-neutral-950">
                        {item.title}
                    </h2>

                    <p className="mt-1 text-[12px] font-medium text-neutral-500">
                        {item.company}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <ActionButton
                    icon={Edit3}
                    label="Edit"
                    onClick={() => onEdit?.(item)}
                />

                {canPublish ? (
                    <ActionButton
                        icon={Play}
                        label="Terbitkan"
                        variant="green"
                        onClick={() => onPublish?.(item)}
                    />
                ) : null}

                {canClose ? (
                    <ActionButton
                        icon={Archive}
                        label="Tutup"
                        onClick={() => onClose?.(item)}
                    />
                ) : null}

                {canDelete ? (
                    <ActionButton
                        icon={Trash2}
                        label="Hapus"
                        variant="red"
                        onClick={() => onDelete?.(item)}
                    />
                ) : null}
            </div>
        </div>
    );
}