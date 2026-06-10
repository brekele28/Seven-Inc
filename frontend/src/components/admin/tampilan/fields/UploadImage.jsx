import { useRef } from "react";
import { ImagePlus } from "lucide-react";

import ImageActions from "../actions/ImageActions";

import EditImageModal from "../modal/EditImageModal";
import DeleteImageModal from "../modal/DeleteImageModal";

export default function UploadImage({
    image,
    imagePreview,

    isEditing,

    onEdit,
    onDelete,

    isEditOpen,
    isDeleteOpen,

    onCloseEdit,
    onCloseDelete,

    onImageChange,
    onConfirmDelete,
}) {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        if (!isEditing) return;

        fileInputRef.current?.click();
    };

    return (
        <>
            <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Hero Image
                </label>

                <div className="relative">
                    {image && isEditing ? (
                        <ImageActions
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ) : null}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(event) =>
                            onImageChange?.(event.target.files?.[0])
                        }
                        className="hidden"
                    />

                    {imagePreview ? (
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            disabled={!isEditing}
                            className={[
                                "relative w-full overflow-hidden rounded-[28px]",
                                "border border-neutral-200",
                                "bg-neutral-100",
                                isEditing
                                    ? "cursor-pointer"
                                    : "cursor-default",
                            ].join(" ")}
                        >
                            <img
                                src={imagePreview}
                                alt="Hero Preview"
                                className="h-[240px] w-full object-cover sm:h-[300px]"
                            />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            disabled={!isEditing}
                            className={[
                                "group relative flex min-h-[220px] sm:min-h-[240px]",
                                "w-full flex-col items-center justify-center",
                                "overflow-hidden rounded-[28px]",
                                "border border-dashed border-neutral-300",
                                "bg-gradient-to-br from-neutral-50 via-white to-red-50",
                                "px-4 py-8 transition duration-300",
                                isEditing
                                    ? "cursor-pointer hover:border-red-300"
                                    : "cursor-default opacity-90",
                            ].join(" ")}
                        >
                            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-100/40 blur-3xl transition duration-300 group-hover:scale-110" />

                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg transition duration-300 group-hover:scale-105">
                                <ImagePlus className="h-9 w-9 text-red-500" />
                            </div>

                            <h3 className="relative mt-6 text-center text-[15px] sm:text-[16px] font-black text-neutral-900">
                                Upload Hero Image
                            </h3>

                            <p className="relative mt-2 max-w-md text-center text-[12px] sm:text-[13px] leading-relaxed text-neutral-500">
                                Gunakan gambar landscape dengan kualitas tinggi agar
                                hero section landing page terlihat lebih premium dan
                                profesional.
                            </p>

                            <div className="relative mt-5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-bold text-red-600">
                                JPG • PNG • WEBP
                            </div>
                        </button>
                    )}
                </div>
            </div>

            <EditImageModal
                open={isEditOpen}
                onClose={onCloseEdit}
                onChange={onImageChange}
            />

            <DeleteImageModal
                open={isDeleteOpen}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
            />
        </>
    );
}