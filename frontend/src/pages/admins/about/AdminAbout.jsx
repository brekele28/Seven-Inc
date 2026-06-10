import { useState } from "react";

import useAbout from "../../../hooks/admin/about/useAbout";

import Hero from "./ui/form/Hero";
import Description from "./ui/form/Description";
import CoreValue from "./ui/form/CoreValue";
import Principles from "./ui/form/Principles";
import Actions from "./ui/form/Actions";

import EditImageModal from "../../../components/admin/about/modal/EditImageModal";
import DeleteImageModal from "../../../components/admin/about/modal/DeleteImageModal";

import ConfirmSaveModal from "../../../components/admin/about/modal/ConfirmSaveModal";
import ConfirmDeleteModal from "../../../components/admin/about/modal/ConfirmDeleteModal";

export default function AdminAbout() {
    const {
        // Edit Mode
        isEditing,
        enableEditMode,

        // Hero
        hero,
        heroPreview,

        editHeroOpen,
        deleteHeroOpen,

        openEditHero,
        closeEditHero,

        openDeleteHero,
        closeDeleteHero,

        handleUploadHero,
        confirmDeleteHero,

        // Company Description
        companyDesc,

        addLeftParagraph,
        deleteLeftParagraph,
        updateLeftParagraph,

        addRightParagraph,
        deleteRightParagraph,
        updateRightParagraph,

        // Core Value
        coreValue,
        updateCoreValue,

        // Principles
        principles,

        updatePrincipleTitle,

        addPrincipleDescription,
        updatePrincipleDescription,
        deletePrincipleDescription,

        openEditPrincipleImage,
        openDeletePrincipleImage,

        editPrincipleImageModal,
        closeEditPrincipleImage,

        deletePrincipleImageModal,
        closeDeletePrincipleImage,

        handleUploadPrincipleImage,
        confirmDeletePrincipleImage,

        // Actions
        handleReset,
        handleSave,
    } = useAbout();

    const [confirmSaveOpen, setConfirmSaveOpen] =
        useState(false);

    const [confirmDeleteOpen, setConfirmDeleteOpen] =
        useState(false);

    const openConfirmSave = () => {
        setConfirmSaveOpen(true);
    };

    const closeConfirmSave = () => {
        setConfirmSaveOpen(false);
    };

    const openConfirmDelete = () => {
        setConfirmDeleteOpen(true);
    };

    const closeConfirmDelete = () => {
        setConfirmDeleteOpen(false);
    };

    const handleConfirmSave = () => {
        handleSave();

        closeConfirmSave();
    };

    const handleConfirmDelete = () => {
        handleReset();

        closeConfirmDelete();
    };

    return (
        <>
            <div className="space-y-6">
                <Hero
                    hero={hero}
                    heroPreview={heroPreview}
                    isEditing={isEditing}
                    openEditHero={openEditHero}
                    openDeleteHero={openDeleteHero}
                    handleUploadHero={handleUploadHero}
                />

                <Description
                    isEditing={isEditing}
                    companyDesc={companyDesc}
                    addLeftParagraph={addLeftParagraph}
                    deleteLeftParagraph={deleteLeftParagraph}
                    updateLeftParagraph={updateLeftParagraph}
                    addRightParagraph={addRightParagraph}
                    deleteRightParagraph={deleteRightParagraph}
                    updateRightParagraph={updateRightParagraph}
                />

                <CoreValue
                    isEditing={isEditing}
                    coreValue={coreValue}
                    updateCoreValue={updateCoreValue}
                />

                <Principles
                    isEditing={isEditing}
                    principles={principles}
                    updatePrincipleTitle={
                        updatePrincipleTitle
                    }
                    addPrincipleDescription={
                        addPrincipleDescription
                    }
                    updatePrincipleDescription={
                        updatePrincipleDescription
                    }
                    deletePrincipleDescription={
                        deletePrincipleDescription
                    }
                    openEditPrincipleImage={
                        openEditPrincipleImage
                    }
                    openDeletePrincipleImage={
                        openDeletePrincipleImage
                    }
                />

                <Actions
                    isEditing={isEditing}
                    onEdit={enableEditMode}
                    onReset={openConfirmDelete}
                    onSave={openConfirmSave}
                />
            </div>

            {/* HERO IMAGE */}

            <EditImageModal
                open={editHeroOpen}
                onClose={closeEditHero}
                onUpload={handleUploadHero}
            />

            <DeleteImageModal
                open={deleteHeroOpen}
                onClose={closeDeleteHero}
                onConfirm={confirmDeleteHero}
            />

            {/* PRINCIPLE IMAGE */}

            <EditImageModal
                open={editPrincipleImageModal.open}
                onClose={closeEditPrincipleImage}
                onUpload={(file) =>
                    handleUploadPrincipleImage(
                        editPrincipleImageModal.id,
                        file
                    )
                }
            />

            <DeleteImageModal
                open={deletePrincipleImageModal.open}
                onClose={closeDeletePrincipleImage}
                onConfirm={() =>
                    confirmDeletePrincipleImage(
                        deletePrincipleImageModal.id
                    )
                }
            />

            {/* SAVE CONFIRM */}

            <ConfirmSaveModal
                open={confirmSaveOpen}
                onClose={closeConfirmSave}
                onConfirm={handleConfirmSave}
            />

            {/* DELETE CONFIRM */}

            <ConfirmDeleteModal
                open={confirmDeleteOpen}
                onClose={closeConfirmDelete}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}