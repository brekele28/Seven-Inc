import { useRef } from "react";
import { ImagePlus } from "lucide-react";

import ImageActions from "../actions/ImageActions";

export default function UploadField({
    image,
    onUpload,
    onEdit,
    onDelete,
    label = "Image",
    uploadTitle = "Upload Image",
    uploadDescription = "Pilih gambar untuk ditampilkan.",
    disabled = false,
}) {
    const inputRef = useRef(null);

    const handleChooseFile = () => {
        if (disabled) return;

        inputRef.current?.click();
    };

    const handleChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        onUpload?.(file);

        event.target.value = "";
    };

    const imageSrc =
        image instanceof File
            ? URL.createObjectURL(image)
            : image;

    return (
        <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                {label}
            </label>

            <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleChange}
                className="hidden"
            />

            <div className="relative">
                {image && !disabled && (
                    <ImageActions
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                )}

                <button
                    type="button"
                    disabled={disabled && !image}
                    onClick={!image ? handleChooseFile : undefined}
                    className="group relative flex min-h-[240px] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-neutral-300 bg-gradient-to-br from-neutral-50 via-white to-red-50 px-6 py-8 transition duration-300 hover:border-red-300"
                >
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-100/40 blur-3xl transition duration-300 group-hover:scale-110" />

                    {image ? (
                        <>
                            <img
                                src={imageSrc}
                                alt="Preview"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/10" />
                        </>
                    ) : (
                        <>
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                <ImagePlus className="h-9 w-9 text-red-500" />
                            </div>

                            <h3 className="relative mt-6 text-center text-[16px] font-black text-neutral-900">
                                {uploadTitle}
                            </h3>

                            <p className="relative mt-2 max-w-md text-center text-[13px] leading-relaxed text-neutral-500">
                                {uploadDescription}
                            </p>

                            <div className="relative mt-5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-bold text-red-600">
                                JPG • PNG • WEBP
                            </div>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}