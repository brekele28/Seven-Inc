import Row from "../table/Row";

const items = Array.from({ length: 10 }).map((_, index) => ({
    id: index + 1,
    title: "Kolaborasi Tim yang Sehat untuk Mendorong Produktivitas",
    status: index % 2 === 0 ? "Published" : "Draft",
}));

export default function Table({
    onDetail,
    onEdit,
    onCopy,
}) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-7">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                    News Table
                </p>

                <h2 className="mt-2 text-[24px] font-black text-neutral-950">
                    Data Berita
                </h2>
            </div>

            <div className="overflow-x-auto">
                <div className="max-h-[560px] overflow-y-auto">
                    <table className="min-w-[900px] w-full">
                        <thead className="sticky top-0 z-10 bg-white">
                            <tr className="border-b border-neutral-100">
                                <th className="px-6 py-4 text-left text-[12px] font-black uppercase tracking-wider text-neutral-500">
                                    No
                                </th>

                                <th className="px-6 py-4 text-left text-[12px] font-black uppercase tracking-wider text-neutral-500">
                                    Thumbnail
                                </th>

                                <th className="px-6 py-4 text-left text-[12px] font-black uppercase tracking-wider text-neutral-500">
                                    Judul
                                </th>

                                <th className="px-6 py-4 text-left text-[12px] font-black uppercase tracking-wider text-neutral-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-[12px] font-black uppercase tracking-wider text-neutral-500">
                                    Publish
                                </th>

                                <th className="px-6 py-4 text-center text-[12px] font-black uppercase tracking-wider text-neutral-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => (
                                <Row
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onDetail={onDetail}
                                    onEdit={onEdit}
                                    onCopy={onCopy}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}