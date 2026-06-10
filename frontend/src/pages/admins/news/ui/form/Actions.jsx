export default function Actions() {
    return (
        <section className="rounded-[30px] border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 className="text-[20px] font-black text-neutral-950">
                        Simpan Perubahan
                    </h3>

                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                        Pastikan seluruh data berita sudah benar sebelum dipublikasikan.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        className="h-12 rounded-2xl border border-neutral-200 bg-white px-5 text-[13px] font-bold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        className="h-12 rounded-2xl bg-red-600 px-6 text-[13px] font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </section>
    );
}