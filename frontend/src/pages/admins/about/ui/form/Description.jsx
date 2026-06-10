import { useState } from "react";
import { Plus } from "lucide-react";

import DescriptionColumnCard from "../../../../../components/admin/about/cards/DescriptionColumnCard";
import DeleteFieldModal from "../../../../../components/admin/about/modal/DeleteFieldModal";

export default function Description({
    companyDesc,

    addLeftParagraph,
    addRightParagraph,

    deleteLeftParagraph,
    deleteRightParagraph,

    updateLeftParagraph,
    updateRightParagraph,

    isEditing,
}) {
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        type: null,
        index: null,
    });

    const openDeleteModal = (type, index) => {
        if (!isEditing) return;

        setDeleteModal({
            open: true,
            type,
            index,
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            open: false,
            type: null,
            index: null,
        });
    };

    const confirmDelete = () => {
        if (deleteModal.type === "left") {
            deleteLeftParagraph(deleteModal.index);
        }

        if (deleteModal.type === "right") {
            deleteRightParagraph(deleteModal.index);
        }

        closeDeleteModal();
    };

    return (
        <>
            <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
                <div className="rounded-t-[32px] border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                        Company Description
                    </p>

                    <h2 className="mt-2 text-[22px] font-black text-neutral-950 sm:text-[28px]">
                        Deskripsi Perusahaan
                    </h2>

                    <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500">
                        Kelola seluruh paragraf yang tampil pada halaman About
                        perusahaan.
                    </p>
                </div>

                <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[18px] font-black text-neutral-950">
                                Layout Kiri
                            </h3>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={addLeftParagraph}
                                    className="
                                        flex items-center gap-2
                                        rounded-xl bg-red-600
                                        px-4 py-2
                                        text-[13px] font-bold text-white
                                        transition duration-300
                                        hover:bg-red-700
                                        cursor-pointer
                                    "
                                >
                                    <Plus className="h-4 w-4" />
                                    Tambah
                                </button>
                            )}
                        </div>

                        <DescriptionColumnCard
                            title="Paragraf Kiri"
                            paragraphs={companyDesc.left}
                            onChange={updateLeftParagraph}
                            onDelete={(index) =>
                                openDeleteModal("left", index)
                            }
                            isEditing={isEditing}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[18px] font-black text-neutral-950">
                                Layout Kanan
                            </h3>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={addRightParagraph}
                                    className="
                                        flex items-center gap-2
                                        rounded-xl bg-red-600
                                        px-4 py-2
                                        text-[13px] font-bold text-white
                                        transition duration-300
                                        hover:bg-red-700
                                        cursor-pointer
                                    "
                                >
                                    <Plus className="h-4 w-4" />
                                    Tambah
                                </button>
                            )}
                        </div>

                        <DescriptionColumnCard
                            title="Paragraf Kanan"
                            paragraphs={companyDesc.right}
                            onChange={updateRightParagraph}
                            onDelete={(index) =>
                                openDeleteModal("right", index)
                            }
                            isEditing={isEditing}
                        />
                    </div>
                </div>
            </section>

            <DeleteFieldModal
                open={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Hapus Paragraf"
                description="Paragraf yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan?"
            />
        </>
    );
}