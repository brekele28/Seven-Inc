import { Eye } from "lucide-react";

export default function ArchivingRow({ number, archive, onDetail }) {
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
                        {archive.fullName || "-"}
                    </p>

                    <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-neutral-500">
                        {archive.applicationId || "-"}
                    </p>
                </div>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-bold text-neutral-800">
                    {archive.jobTitle || "-"}
                </p>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-semibold text-neutral-800">
                    {archive.phone || "-"}
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">
                    {archive.email || "-"}
                </p>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-semibold text-neutral-700">
                    {archive.acceptedAtLabel || "-"}
                </p>
            </td>

            <td className="px-5 py-4 align-middle">
                <p className="text-[12px] font-semibold text-neutral-700">
                    {archive.startDateLabel || "-"}
                </p>
            </td>

            <td className="px-5 py-4 text-right align-middle">
                <button
                    type="button"
                    onClick={() => onDetail?.(archive)}
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
            </td>
        </tr>
    );
}