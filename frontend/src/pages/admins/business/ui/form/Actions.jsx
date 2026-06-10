export default function Actions() {
    return (
        <section className="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-[20px] font-black text-neutral-950">
                        Simpan Perubahan
                    </h3>

                    <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                        Pastikan seluruh konten bisnis sudah sesuai sebelum
                        disimpan.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        className="cursor-pointer rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-[13px] font-bold text-neutral-700 transition hover:bg-neutral-100"
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        className="cursor-pointer rounded-2xl bg-red-600 px-6 py-3 text-[13px] font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </section>
    );
}