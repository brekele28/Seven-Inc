export default function TableHeader() {
    return (
        <thead className="bg-neutral-50">
            <tr className="border-b border-neutral-200">
                <th className="w-16 px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    No
                </th>
                <th className="min-w-64 px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    Lowongan
                </th>
                <th className="min-w-36 px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    Tanggal
                </th>
                <th className="min-w-32 px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    Status
                </th>
                <th className="min-w-32 px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    Pelamar
                </th>
                <th className="min-w-56 px-5 py-4 text-right text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    Aksi
                </th>
            </tr>
        </thead>
    );
}