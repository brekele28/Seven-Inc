export default function Intro() {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 bg-gradient-to-br from-red-50 via-white to-white px-5 py-6 sm:px-8">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.38em] text-red-600 sm:text-[11px]">
                        Company Description
                    </p>
                    <h2 className="mt-2 text-[24px] font-black leading-tight text-neutral-950 sm:text-[32px]">
                        Deskripsi Perusahaan
                    </h2>
                    <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                        Atur deskripsi utama perusahaan yang tampil pada halaman bisnis user.
                    </p>
                </div>
            </div>

            <div className="px-5 py-6 sm:px-8">
                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                        Description
                    </label>
                    <textarea
                        rows={8}
                        placeholder="Sebagai perusahaan holding multisekor..."
                        className="w-full rounded-3xl border border-neutral-200 bg-white px-5 py-5 text-[14px] leading-loose outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100 sm:text-[15px]"
                    />
                </div>
            </div>
        </section>
    );
}