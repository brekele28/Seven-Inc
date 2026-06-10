export default function TableHeader() {
    return (
        <thead className="bg-neutral-50">
            <tr className="border-b border-neutral-200">
                <th className="px-5 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    No
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    Pelamar
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    Posisi
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    Kontak
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    Diterima
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    Mulai Kerja
                </th>
                <th className="px-5 py-4 text-right text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                    Aksi
                </th>
            </tr>
        </thead>
    );
}