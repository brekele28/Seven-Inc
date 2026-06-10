import { ImagePlus } from "lucide-react";

import ImageActions from "../actions/ImageActions";

export default function UploadField({
    image,
    onEdit,
    onDelete,
    label = "Upload Image",
    description = "Upload gambar berkualitas tinggi.",
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                {label}
            </label>

            <div className="relative">
                {image && (
                    <ImageActions
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                )}

                <button
                    type="button"
                    onClick={!image ? onEdit : undefined}
                    className="
                        group
                        relative
                        flex
                        min-h-[260px]
                        w-full
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-[30px]
                        border
                        border-dashed
                        border-neutral-300
                        bg-gradient-to-br
                        from-red-50/50
                        via-white
                        to-white
                        px-6
                        py-8
                        transition
                        duration-300
                        hover:border-red-300
                    "
                >
                    {image ? (
                        <img
                            src={image}
                            alt="Preview"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <>
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm transition duration-300 group-hover:scale-105">
                                <ImagePlus className="h-9 w-9 text-red-500" />
                            </div>

                            <h3 className="mt-6 text-center text-[16px] font-black text-neutral-900">
                                Upload Image
                            </h3>

                            <p className="mt-2 max-w-sm text-center text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">
                                {description}
                            </p>

                            <div className="mt-5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-bold text-red-600">
                                JPG • PNG • WEBP
                            </div>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}