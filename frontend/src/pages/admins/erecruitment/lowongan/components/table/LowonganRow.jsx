import { Archive, Edit3, Eye, Play, Trash2 } from "lucide-react";
import StatusBadge from "../../../../../../components/admin/lowongan/badge/StatusBadge";

function formatDate(value) {
    if (!value) return "-";

    try {
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(value));
    } catch {
        return value;
    }
}

function ActionButton({ icon: Icon, label, onClick, variant = "neutral" }) {
    const variantClass = {
        neutral: "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
        black: "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800",
        red: "border-red-100 bg-red-50 text-red-600 hover:bg-red-100",
        green: "border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3",
                "text-[11px] font-extrabold shadow-sm transition active:scale-[0.98]",
                variantClass[variant] || variantClass.neutral,
            ].join(" ")}
        >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
        </button>
    );
}

export default function LowonganRow({
    item,
    index,
    selected = false,
    onSelect,
    onEdit,
    onClose,
    onDelete,
    onPublish,
}) {
    const canClose = item.status === "active";
    const canPublish = item.status === "draft" || item.status === "closed";
    const canDelete = item.status === "closed" || item.status === "expired" || item.status === "draft";

    const applicantCount = Number(item.applicantCount || 0);

    return (
        <tr
            className={[
                "h-[112px] border-b border-neutral-100 transition last:border-b-0",
                selected ? "bg-red-50/40" : "bg-white hover:bg-neutral-50/70",
            ].join(" ")}
        >
            <td className="px-5 py-5 align-middle">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 text-[12px] font-black text-neutral-800">
                    {index + 1}
                </div>
            </td>

            <td className="px-5 py-5 align-middle">
                <button
                    type="button"
                    onClick={() => onSelect?.(item.id)}
                    className="cursor-pointer text-left"
                >
                    <p className="text-[13px] font-black leading-6 text-neutral-950">
                        {item.title || "-"}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-neutral-500">
                        {item.company || "Seven INC"}
                    </p>
                    <p className="mt-2 line-clamp-2 max-w-sm text-[11px] leading-5 text-neutral-500">
                        {item.intro || "-"}
                    </p>
                </button>
            </td>

            <td className="px-5 py-5 align-middle">
                <p className="text-[12px] font-extrabold text-neutral-900">
                    {formatDate(item.openedAt)}
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">
                    Tutup: {formatDate(item.closedAt)}
                </p>
            </td>

            <td className="px-5 py-5 align-middle">
                <StatusBadge status={item.status} />
            </td>

            <td className="px-5 py-5 align-middle">
                <p className="text-[18px] font-black text-neutral-950">
                    {applicantCount}
                </p>
                <p className="text-[11px] text-neutral-500">
                    {applicantCount === 1 ? "pelamar" : "pelamar"}
                </p>
            </td>

            <td className="px-5 py-5 align-middle">
                <div className="flex flex-wrap justify-end gap-2">
                    <ActionButton
                        icon={Eye}
                        label="Detail"
                        variant="black"
                        onClick={() => onSelect?.(item.id)}
                    />

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
            </td>
        </tr>
    );
}