export default function BasicInfoForm({ values, onChangeField }) {
    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <h3 className="text-[14px] font-black text-neutral-950">
                Informasi Dasar
            </h3>

            <p className="mt-1 text-[12px] leading-6 text-neutral-500">
                Isi informasi utama lowongan. Nama perusahaan dan lokasi dibuat tetap
                sesuai kebutuhan Seven INC.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                    <span className="mb-2 block text-[12px] font-extrabold text-neutral-900">
                        Nama Posisi
                    </span>
                    <input
                        value={values.title}
                        onChange={(e) => onChangeField?.("title", e.target.value)}
                        placeholder="Contoh: UI/UX Designer"
                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-[13px] font-semibold text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-[12px] font-extrabold text-neutral-900">
                        Tanggal Buka
                    </span>
                    <input
                        type="date"
                        value={values.openedAt}
                        onChange={(e) => onChangeField?.("openedAt", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-[13px] font-semibold text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-[12px] font-extrabold text-neutral-900">
                        Tanggal Tutup
                    </span>
                    <input
                        type="date"
                        value={values.closedAt}
                        onChange={(e) => onChangeField?.("closedAt", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-[13px] font-semibold text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
                    />
                </label>

                <label className="block md:col-span-2">
                    <span className="mb-2 block text-[12px] font-extrabold text-neutral-900">
                        Status Awal
                    </span>
                    <select
                        value={values.status}
                        onChange={(e) => onChangeField?.("status", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-[13px] font-extrabold text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
                    >
                        <option value="draft">Simpan sebagai Draft</option>
                        <option value="active">Terbitkan sebagai Aktif</option>
                    </select>
                </label>

                <label className="block md:col-span-2">
                    <span className="mb-2 block text-[12px] font-extrabold text-neutral-900">
                        Deskripsi Singkat
                    </span>
                    <textarea
                        value={values.intro}
                        onChange={(e) => onChangeField?.("intro", e.target.value)}
                        placeholder="Tulis ringkasan tanggung jawab posisi ini..."
                        className="min-h-28 w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-[13px] font-semibold leading-7 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
                    />
                </label>
            </div>
        </div>
    );
}