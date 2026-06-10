import Swal from "sweetalert2";
import { Eye, Trash2 } from "lucide-react";

import StatusBadge from "../../../../../../components/admin/pelamar/badge/StatusBadge";
import DeadlineBadge from "../../../../../../components/admin/pelamar/badge/DeadlineBadge";

export default function PelamarRow({
    number,
    applicant,
    onDetail,
    canDelete = false,
    onDelete,
}) {
    const handleDelete = async () => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Hapus data pelamar?",
            text: "Data yang dihapus tidak dapat dikembalikan.",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
        });

        if (!result.isConfirmed) return;

        try {
            await onDelete?.(applicant.lamaranId || applicant.id || applicant.applicationId);

            await Swal.fire({
                icon: "success",
                title: "Data berhasil dihapus",
                text: "Data pelamar berhasil dihapus dari sistem.",
                confirmButtonColor: "#4f46e5",
            });
        } catch (err) {
            await Swal.fire({
                icon: "error",
                title: "Gagal menghapus data",
                text:
                    err?.message ||
                    "Terjadi kendala saat menghapus data pelamar. Silakan coba lagi.",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    return (
        <tr className="h-[92px] border-b border-neutral-100 transition hover:bg-neutral-50/70 last:border-b-0">
            <td className="px-5 py-4 align-middle">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 text-[12px] font-extrabold text-neutral-700">
                    {number}
                </div>
            </td>

            <td className="px-5 py-4 align-middle">
                <div>
                    <p className="text-[13px] font-extrabold text-neutral-900">
                        {applicant.fullName || "-"}
                    </p>

                    <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-neutral-500">
                        {applicant.applicationId || "-"}
                    </p>
                </div>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-bold text-neutral-800">
                    {applicant.jobTitle || "-"}
                </p>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-semibold text-neutral-800">
                    {applicant.phone || "-"}
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">
                    {applicant.email || "-"}
                </p>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-semibold text-neutral-700">
                    {applicant.appliedAtLabel || "-"}
                </p>
            </td>

            <td className="px-5 py-4 align-middle">
                <StatusBadge
                    status={applicant.status}
                    label={applicant.statusLabel}
                />
            </td>

            <td className="px-5 py-4 align-middle">
                <DeadlineBadge
                    level={applicant.deadlineLevel}
                    label={applicant.deadlineLabel}
                />
            </td>

            <td className="px-5 py-4 align-middle">
                <div className="flex items-center justify-end gap-2">
                    {canDelete ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className={[
                                "inline-flex cursor-pointer items-center justify-center gap-2",
                                "rounded-full border border-red-100 bg-red-50 px-4 py-2",
                                "text-[12px] font-bold text-red-600",
                                "transition hover:bg-red-100 active:scale-[0.98]",
                            ].join(" ")}
                        >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                            Hapus
                        </button>
                    ) : null}

                    <button
                        type="button"
                        onClick={() => onDetail?.(applicant)}
                        className={[
                            "inline-flex cursor-pointer items-center justify-center gap-2",
                            "rounded-full bg-neutral-900 px-4 py-2",
                            "text-[12px] font-bold text-white",
                            "transition hover:bg-neutral-800 active:scale-[0.98]",
                        ].join(" ")}
                    >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        Detail
                    </button>
                </div>
            </td>
        </tr>
    );
}