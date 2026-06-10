export default function Related({
    disabled = false,
}) {
    return (
        <section className="rounded-[30px] border border-neutral-200 bg-white p-5">
            <div>
                <h3 className="text-[20px] font-black text-neutral-950">
                    Related Article
                </h3>

                <p className="mt-2 text-[13px] text-neutral-500">
                    Sisipkan link artikel lainnya ke dalam berita.
                </p>
            </div>

            <div className="mt-6 rounded-[28px] border border-neutral-200 p-5">
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Text Link
                        </label>

                        <input
                            disabled={disabled}
                            type="text"
                            placeholder="Pengumuman Posisi Pekerjaan"
                            className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            URL Link
                        </label>

                        <input
                            disabled={disabled}
                            type="text"
                            placeholder="https://..."
                            className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}