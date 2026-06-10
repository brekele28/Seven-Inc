import { useState } from "react";

import internshipRepository from "../../../services/admin/internship/repository/internshipRepository";

export default function useInternship() {
    const [requirements, setRequirements] = useState(
        internshipRepository.getRequirements()
    );

    const [benefits, setBenefits] = useState(
        internshipRepository.getBenefits()
    );

    const [positions, setPositions] = useState(
        internshipRepository.getPositions()
    );

    const [heroImage, setHeroImage] = useState(null);
    const [heroPreview, setHeroPreview] = useState("");

    const [editImageOpen, setEditImageOpen] = useState(false);
    const [deleteImageOpen, setDeleteImageOpen] = useState(false);

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        type: null,
        index: null,
        id: null,
    });

    const handleUploadHero = (file) => {
        if (!file) return;

        setHeroImage(file);
        setHeroPreview(URL.createObjectURL(file));

        closeEditImage();
    };

    const openEditImage = () => {
        setEditImageOpen(true);
    };

    const closeEditImage = () => {
        setEditImageOpen(false);
    };

    const openDeleteImage = () => {
        setDeleteImageOpen(true);
    };

    const closeDeleteImage = () => {
        setDeleteImageOpen(false);
    };

    const confirmDeleteImage = () => {
        setHeroImage(null);
        setHeroPreview("");

        closeDeleteImage();
    };

    const openDeleteModal = (payload) => {
        setDeleteModal({
            open: true,
            ...payload,
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            open: false,
            type: null,
            index: null,
            id: null,
        });
    };

    const confirmDelete = () => {
        if (deleteModal.type === "requirement") {
            setRequirements((prev) =>
                prev.filter(
                    (_, index) =>
                        index !== deleteModal.index
                )
            );
        }

        if (deleteModal.type === "benefit") {
            setBenefits((prev) =>
                prev.filter(
                    (_, index) =>
                        index !== deleteModal.index
                )
            );
        }

        if (deleteModal.type === "position") {
            setPositions((prev) =>
                prev.filter(
                    (item) =>
                        item.id !== deleteModal.id
                )
            );
        }

        closeDeleteModal();
    };

    const addRequirement = () => {
        setRequirements((prev) => [
            ...prev,
            "",
        ]);
    };

    const addBenefit = () => {
        setBenefits((prev) => [
            ...prev,
            "",
        ]);
    };

    const addPosition = () => {
        setPositions((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: "",
            },
        ]);
    };

    return {
        requirements,
        benefits,
        positions,

        heroImage,
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
    };
}