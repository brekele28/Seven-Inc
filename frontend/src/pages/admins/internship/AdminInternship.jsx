import useInternship from "../../../hooks/admin/internship/useInternship";

import Hero from "./ui/form/Hero";
import Requirement from "./ui/form/Requirement";
import Positions from "./ui/form/Positions";
import Benefits from "./ui/form/Benefits";
import Actions from "./ui/form/Actions";

import DeleteConfirmModal from "../../../components/admin/internship/modal/DeleteConfirmModal";

import EditImageModal from "../../../components/admin/internship/modal/EditImageModal";
import DeleteImageModal from "../../../components/admin/internship/modal/DeleteImageModal";

export default function AdminInternship() {
    const {
        requirements,
        benefits,
        positions,

        heroPreview,

        editImageOpen,
        deleteImageOpen,

        openEditImage,
        closeEditImage,

        openDeleteImage,
        closeDeleteImage,

        handleUploadHero,
        confirmDeleteImage,

        addRequirement,
        addBenefit,
        addPosition,

        deleteModal,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
    } = useInternship();

    return (
        <>
            <div className="space-y-6">
                <Hero
                    heroPreview={heroPreview}
                    onUploadHero={handleUploadHero}
                    onEditImage={openEditImage}
                    onDeleteImage={openDeleteImage}
                />

                <Requirement
                    requirements={requirements}
                    addRequirement={addRequirement}
                    openDeleteModal={openDeleteModal}
                />

                <Positions
                    positions={positions}
                    addPosition={addPosition}
                    openDeleteModal={openDeleteModal}
                />

                <Benefits
                    benefits={benefits}
                    addBenefit={addBenefit}
                    openDeleteModal={openDeleteModal}
                />

                <Actions />
            </div>

            <EditImageModal
                open={editImageOpen}
                onClose={closeEditImage}
                onUpload={handleUploadHero}
            />

            <DeleteImageModal
                open={deleteImageOpen}
                onClose={closeDeleteImage}
                onConfirm={confirmDeleteImage}
            />

            <DeleteConfirmModal
                open={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Hapus Data"
                description="Data yang dihapus tidak dapat dikembalikan lagi. Pastikan data yang dipilih sudah benar."
            />
        </>
    );
}