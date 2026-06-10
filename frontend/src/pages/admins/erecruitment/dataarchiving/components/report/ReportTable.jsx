export default function ReportTable({
    archives = [],
    onOpenArchive,
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] border-collapse">
                    <thead className="bg-neutral-50">
                        <tr className="border-b border-neutral-200">
                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                No
                            </th>

                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                ID Lamaran
                            </th>

                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                Nama
                            </th>

                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                Posisi
                            </th>

                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                No. WhatsApp
                            </th>

                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                Diterima
                            </th>

                            <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                                Mulai Kerja
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {archives.length ? (
                            archives.map((archive, index) => (
                                <tr
                                    key={archive.applicationId}
                                    className="border-b border-neutral-100 last:border-b-0"
                                >
                                    <td className="px-4 py-3 text-[12px] font-bold text-neutral-700">
                                        {index + 1}
                                    </td>

                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onOpenArchive?.(
                                                    archive.applicationId
                                                )
                                            }
                                            className={[
                                                "cursor-pointer",
                                                "text-[12px]",
                                                "font-bold",
                                                "tracking-[0.08em]",
                                                "text-neutral-900",
                                                "transition",
                                                "hover:text-red-600",
                                                "hover:underline",
                                            ].join(" ")}
                                            title={`Lihat detail ${archive.applicationId}`}
                                        >
                                            {archive.applicationId}
                                        </button>
                                    </td>

                                    <td className="px-4 py-3 text-[12px] font-bold text-neutral-900">
                                        {archive.fullName}
                                    </td>

                                    <td className="px-4 py-3 text-[12px] font-semibold text-neutral-700">
                                        {archive.jobTitle}
                                    </td>

                                    <td className="px-4 py-3 text-[12px] font-semibold text-neutral-700">
                                        {archive.phone}
                                    </td>

                                    <td className="px-4 py-3 text-[12px] font-semibold text-neutral-700">
                                        {archive.acceptedAtLabel}
                                    </td>

                                    <td className="px-4 py-3 text-[12px] font-semibold text-neutral-700">
                                        {archive.startDateLabel}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-10 text-center text-[12px] font-semibold text-neutral-500"
                                >
                                    Tidak ada data arsip untuk laporan ini.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}