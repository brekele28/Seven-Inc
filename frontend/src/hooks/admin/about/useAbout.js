import { useState } from "react";

import {
    getHeroSection,
    getCompanyDescription,
    getCoreValueContent,
    getPrinciples,
} from "../../../services/admin/about/repository/aboutRepository.js";

export default function useAbout() {
    // ======== GLOBAL EDIT MODE ========
    const [isEditing, setIsEditing] = useState(false);

    const enableEditMode = () => {
        setIsEditing(true);
    };

    const disableEditMode = () => {
        setIsEditing(false);
    };

    // ======== Hero Section ========
    const [hero, setHero] = useState(getHeroSection());

    const [heroPreview, setHeroPreview] = useState(
        hero.image ? URL.createObjectURL(hero.image) : ""
    );

    const [editHeroOpen, setEditHeroOpen] = useState(false);
    const [deleteHeroOpen, setDeleteHeroOpen] = useState(false);

    const handleUploadHero = (file) => {
        if (!file) return;

        setHero((prev) => ({
            ...prev,
            image: file,
        }));

        setHeroPreview(URL.createObjectURL(file));

        setEditHeroOpen(false);
    };

    const openEditHero = () => setEditHeroOpen(true);

    const closeEditHero = () => setEditHeroOpen(false);

    const openDeleteHero = () => setDeleteHeroOpen(true);

    const closeDeleteHero = () => setDeleteHeroOpen(false);

    const confirmDeleteHero = () => {
        setHero((prev) => ({
            ...prev,
            image: null,
        }));

        setHeroPreview("");

        setDeleteHeroOpen(false);
    };

    // ======== Company Description ========
    const [companyDesc, setCompanyDesc] = useState(
        getCompanyDescription()
    );

    const addLeftParagraph = () => {
        setCompanyDesc((prev) => ({
            ...prev,
            left: [...prev.left, ""],
        }));
    };

    const deleteLeftParagraph = (index) => {
        setCompanyDesc((prev) => ({
            ...prev,
            left: prev.left.filter((_, i) => i !== index),
        }));
    };

    const updateLeftParagraph = (index, value) => {
        setCompanyDesc((prev) => {
            const newLeft = [...prev.left];

            newLeft[index] = value;

            return {
                ...prev,
                left: newLeft,
            };
        });
    };

    const addRightParagraph = () => {
        setCompanyDesc((prev) => ({
            ...prev,
            right: [...prev.right, ""],
        }));
    };

    const deleteRightParagraph = (index) => {
        setCompanyDesc((prev) => ({
            ...prev,
            right: prev.right.filter((_, i) => i !== index),
        }));
    };

    const updateRightParagraph = (index, value) => {
        setCompanyDesc((prev) => {
            const newRight = [...prev.right];

            newRight[index] = value;

            return {
                ...prev,
                right: newRight,
            };
        });
    };

    // ======== Core Value Section ========
    const [coreValue, setCoreValue] = useState(
        getCoreValueContent()
    );

    const updateCoreValue = (field, value) => {
        setCoreValue((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ======== Principles Section ========
    const [principles, setPrinciples] = useState(
        getPrinciples()
    );

    const updatePrincipleTitle = (
        id,
        value
    ) => {
        setPrinciples((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        title: value,
                    }
                    : p
            )
        );
    };

    const addPrincipleDescription = (id) => {
        setPrinciples((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        descriptions: [
                            ...p.descriptions,
                            "",
                        ],
                    }
                    : p
            )
        );
    };

    const updatePrincipleDescription = (
        id,
        index,
        value
    ) => {
        setPrinciples((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    const newDescriptions = [
                        ...p.descriptions,
                    ];

                    newDescriptions[index] = value;

                    return {
                        ...p,
                        descriptions: newDescriptions,
                    };
                }

                return p;
            })
        );
    };

    const deletePrincipleDescription = (
        id,
        index
    ) => {
        setPrinciples((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    const newDescriptions =
                        p.descriptions.filter(
                            (_, i) => i !== index
                        );

                    return {
                        ...p,
                        descriptions: newDescriptions,
                    };
                }

                return p;
            })
        );
    };

    // ======== Image CRUD For Principles ========

    const [editPrincipleImageModal, setEditPrincipleImageModal] =
        useState({
            open: false,
            id: null,
        });

    const [
        deletePrincipleImageModal,
        setDeletePrincipleImageModal,
    ] = useState({
        open: false,
        id: null,
    });

    const openEditPrincipleImage = (
        id,
        file = null
    ) => {
        if (file) {
            handleUploadPrincipleImage(
                id,
                file
            );
            return;
        }

        setEditPrincipleImageModal({
            open: true,
            id,
        });
    };

    const closeEditPrincipleImage = () => {
        setEditPrincipleImageModal({
            open: false,
            id: null,
        });
    };

    const openDeletePrincipleImage = (id) => {
        setDeletePrincipleImageModal({
            open: true,
            id,
        });
    };

    const closeDeletePrincipleImage = () => {
        setDeletePrincipleImageModal({
            open: false,
            id: null,
        });
    };

    const handleUploadPrincipleImage = (
        id,
        file
    ) => {
        setPrinciples((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        image: file,
                    }
                    : p
            )
        );

        closeEditPrincipleImage();
    };

    const confirmDeletePrincipleImage = (id) => {
        setPrinciples((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        image: null,
                    }
                    : p
            )
        );

        closeDeletePrincipleImage();
    };

    // ======== Reset & Save ========

    const handleReset = () => {
        const heroData = getHeroSection();

        setHero(heroData);

        setCompanyDesc(
            getCompanyDescription()
        );

        setCoreValue(
            getCoreValueContent()
        );

        setPrinciples(
            getPrinciples()
        );

        setHeroPreview(
            heroData.image
                ? URL.createObjectURL(
                    heroData.image
                )
                : ""
        );

        setIsEditing(false);
    };

    const handleSave = () => {
        console.log(
            "save hero, companyDesc, coreValue, principles"
        );

        setIsEditing(false);
    };

    return {
        // Edit Mode
        isEditing,
        enableEditMode,
        disableEditMode,

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

        // Company Desc
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

        editPrincipleImageModal,
        deletePrincipleImageModal,

        openEditPrincipleImage,
        closeEditPrincipleImage,

        openDeletePrincipleImage,
        closeDeletePrincipleImage,

        handleUploadPrincipleImage,
        confirmDeletePrincipleImage,

        // Reset & Save
        handleReset,
        handleSave,
    };
}