import { ImagePlus } from "lucide-react";

export default function UploadLogoField({
    logo,
    onChange,
}) {
    return (
        <label className="group relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[32px] border border-dashed border-neutral-300 bg-gradient-to-br from-red-50/60 via-white to-white p-6 transition duration-300 hover:border-red-300 hover:shadow-xl hover:shadow-red-100">
            <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={onChange}
                className="hidden"
            />

            {logo ? (
                <div className="flex flex-col items-center">
                    <div className="rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm">
                        <img
                            src={logo}
                            alt="Navbar Logo"
                            className="h-24 object-contain sm:h-28"
                        />
                    </div>

                    <p className="mt-5 text-center text-[13px] font-semibold text-neutral-500">
                        Klik untuk mengganti logo navbar
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm transition duration-300 group-hover:scale-105">
                        <ImagePlus className="h-10 w-10 text-red-500" />
                    </div>

                    <h3 className="mt-6 text-center text-[26px] font-black text-neutral-950 sm:text-[30px]">
                        Upload Logo Navbar
                    </h3>

                    <p className="mt-3 max-w-md text-center text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                        Gunakan logo berkualitas tinggi agar navbar terlihat
                        profesional, modern, dan premium.
                    </p>
                </>
            )}
        </label>
    );
}