import { Newspaper } from "lucide-react";

import Upload from "../field/Upload";

export default function Hero() {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-8 sm:py-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
                        <Newspaper className="h-7 w-7 text-red-500" />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.38em] text-red-600">
                            News Section
                        </p>

                        <h2 className="mt-2 text-[28px] font-black leading-tight text-neutral-950 sm:text-[34px]">
                            Kelola Berita
                        </h2>

                        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                            Kelola hero berita, artikel terbaru, status publikasi,
                            dan seluruh konten berita perusahaan.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6 px-5 py-5 sm:px-8 sm:py-7">
                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Badge Text
                    </label>

                    <input
                        type="text"
                        placeholder="LIST BERITA"
                        className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] font-medium outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Heading
                    </label>

                    <textarea
                        rows={3}
                        placeholder="Beberapa berita terbaru kami"
                        className="w-full rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-[15px] font-semibold outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                    />
                </div>

                <Upload />
            </div>
        </section>
    );
}