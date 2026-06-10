import { ImagePlus } from "lucide-react";

export default function Upload() {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                Hero Background
            </label>

            <button
                type="button"
                className="group flex min-h-[250px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-neutral-300 bg-gradient-to-br from-red-50/70 via-white to-white px-6 py-10 transition duration-300 hover:border-red-300 hover:shadow-lg hover:shadow-red-100"
            >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm transition duration-300 group-hover:scale-105">
                    <ImagePlus className="h-9 w-9 text-red-500" />
                </div>

                <h3 className="mt-6 text-center text-[18px] font-black text-neutral-900">
                    Upload Hero Background
                </h3>

                <p className="mt-2 max-w-md text-center text-[13px] leading-relaxed text-neutral-500">
                    Gunakan gambar berkualitas tinggi agar tampilan halaman berita
                    terlihat lebih profesional dan modern.
                </p>
            </button>
        </div>
    );
}