import { ImagePlus } from "lucide-react";

export default function UploadField() {
    return (
        <button
            type="button"
            className="group flex min-h-[260px] w-full cursor-pointer flex-col items-center justify-center rounded-[30px] border border-dashed border-neutral-300 bg-gradient-to-br from-red-50/70 via-white to-white p-6 transition duration-300 hover:border-red-300 hover:shadow-lg hover:shadow-red-100"
        >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm transition duration-300 group-hover:scale-105">
                <ImagePlus className="h-9 w-9 text-red-500" />
            </div>

            <h3 className="mt-5 text-center text-[20px] font-black text-neutral-950">
                Upload Logo Footer
            </h3>

            <p className="mt-2 max-w-md text-center text-[13px] leading-relaxed text-neutral-500">
                Upload logo perusahaan berkualitas tinggi agar footer terlihat
                lebih profesional dan modern.
            </p>
        </button>
    );
}