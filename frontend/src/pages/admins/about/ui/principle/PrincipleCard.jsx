import { Plus } from "lucide-react";
import { useState } from "react";

import Paragraph from "./Paragraph";

import UploadField from "../../../../../components/admin/about/fields/UploadField";
import EditImageModal from "../../../../../components/admin/about/modal/EditImageModal";
import DeleteFieldModal from "../../../../../components/admin/about/modal/DeleteFieldModal";

export default function PrincipleCard({
    principle,
    addDescription,
    updateDescription,
    deleteDescription,
    updateTitle,
    openEditImage,
    openDeleteImage,
    isEditing,
}) {
    const [editImageOpen, setEditImageOpen] = useState(false);

    const [deleteFieldOpen, setDeleteFieldOpen] = useState({
        open: false,
        index: null,
    });

    const handleOpenDeleteField = (index) => {
        if (!isEditing) return;

        setDeleteFieldOpen({
            open: true,
            index,
        });
    };

    const handleCloseDeleteField = () => {
        setDeleteFieldOpen({
            open: false,
            index: null,
        });
    };

    const handleDeleteField = () => {
        if (deleteFieldOpen.index !== null) {
            deleteDescription(
                principle.id,
                deleteFieldOpen.index
            );
        }

        handleCloseDeleteField();
    };

    return (
        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                    Principle Card
                </p>

                <h3 className="mt-2 text-[22px] font-black text-neutral-950">
                    {principle.title}
                </h3>
            </div>

            <div className="space-y-6 p-5">
                <UploadField
                    disabled={!isEditing}
                    label="Core Value Image"
                    uploadTitle="Upload Core Value Image"
                    uploadDescription="Upload gambar untuk card core value perusahaan."
                    image={principle.image}
                    onUpload={(file) =>
                        openEditImage(
                            principle.id,
                            file
                        )
                    }
                    onEdit={() =>
                        setEditImageOpen(true)
                    }
                    onDelete={() =>
                        openDeleteImage(
                            principle.id
                        )
                    }
                />

                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Heading
                    </label>

                    <input
                        type="text"
                        value={principle.title}
                        readOnly={!isEditing}
                        onChange={(e) =>
                            updateTitle(
                                principle.id,
                                e.target.value
                            )
                        }
                        className={`
        h-12 w-full rounded-2xl
        border border-neutral-200
        px-4 text-[14px]
        outline-none transition
        ${isEditing
                                ? "bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                : "bg-neutral-100"
                            }
    `}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <h4 className="text-[15px] font-black text-neutral-950">
                        Descriptions
                    </h4>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={() =>
                                addDescription(principle.id)
                            }
                            className="
                                flex cursor-pointer items-center gap-2
                                rounded-xl bg-red-600
                                px-4 py-2
                                text-[13px] font-bold text-white
                                transition hover:bg-red-700
                            "
                        >
                            <Plus className="h-4 w-4" />
                            Tambah
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {principle.descriptions.map(
                        (item, index) => (
                            <Paragraph
                                key={index}
                                value={item}
                                isEditing={isEditing}
                                onChange={(e) =>
                                    updateDescription(
                                        principle.id,
                                        index,
                                        e.target.value
                                    )
                                }
                                onDelete={() =>
                                    handleOpenDeleteField(
                                        index
                                    )
                                }
                            />
                        )
                    )}
                </div>
            </div>

            <EditImageModal
                open={editImageOpen}
                onClose={() =>
                    setEditImageOpen(false)
                }
                onUpload={(file) =>
                    openEditImage(
                        principle.id,
                        file
                    )
                }
            />

            <DeleteFieldModal
                open={deleteFieldOpen.open}
                onClose={handleCloseDeleteField}
                onConfirm={handleDeleteField}
                title="Hapus Deskripsi"
                description="Apakah Anda yakin ingin menghapus deskripsi ini? Tindakan ini tidak bisa dibatalkan."
            />
        </div>
    );
}