import { useState } from "react";

import {
    getBusinessHero,
    getCompanyDescription,
    getBusinessUnits,
} from "../../../services/admin/business/repository/businessRepository";

export default function useBusiness() {
    // ==================================================
    // HERO SECTION
    // ==================================================
    const [hero, setHero] = useState(getBusinessHero());
    const [heroPreview, setHeroPreview] = useState(
        hero.image ? URL.createObjectURL(hero.image) : ""
    );
    const [editHeroOpen, setEditHeroOpen] = useState(false);
    const [deleteHeroOpen, setDeleteHeroOpen] = useState(false);

    const openEditHero = () => setEditHeroOpen(true);
    const closeEditHero = () => setEditHeroOpen(false);
    const openDeleteHero = () => setDeleteHeroOpen(true);
    const closeDeleteHero = () => setDeleteHeroOpen(false);

    const uploadHeroImage = (file) => {
        if (!file) return;

        setHero((prev) => ({ ...prev, image: file }));
        setHeroPreview(URL.createObjectURL(file));
        closeEditHero();
    };

    const deleteHeroImage = () => {
        setHero((prev) => ({ ...prev, image: null }));
        setHeroPreview("");
        closeDeleteHero();
    };

    // ==================================================
    // COMPANY DESCRIPTION
    // ==================================================
    const [companyDescription, setCompanyDescription] = useState(
        getCompanyDescription()
    );

    // ==================================================
    // BUSINESS UNITS
    // ==================================================
    const [businessUnits, setBusinessUnits] = useState(getBusinessUnits());
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const [editUnitImageOpen, setEditUnitImageOpen] = useState(false);
    const [deleteUnitImageOpen, setDeleteUnitImageOpen] = useState(false);

    const openEditUnitImage = (id) => {
        setSelectedUnitId(id);
        setEditUnitImageOpen(true);
    };

    const closeEditUnitImage = () => {
        setSelectedUnitId(null);
        setEditUnitImageOpen(false);
    };

    const openDeleteUnitImage = (id) => {
        setSelectedUnitId(id);
        setDeleteUnitImageOpen(true);
    };

    const closeDeleteUnitImage = () => {
        setSelectedUnitId(null);
        setDeleteUnitImageOpen(false);
    };

    const uploadUnitImage = (file) => {
        if (!file || !selectedUnitId) return;

        setBusinessUnits((prev) =>
            prev.map((unit) =>
                unit.id === selectedUnitId
                    ? {
                          ...unit,
                          image: file,
                          preview: URL.createObjectURL(file),
                      }
                    : unit
            )
        );
        closeEditUnitImage();
    };

    const deleteUnitImage = () => {
        if (!selectedUnitId) return;

        setBusinessUnits((prev) =>
            prev.map((unit) =>
                unit.id === selectedUnitId
                    ? { ...unit, image: null, preview: "" }
                    : unit
            )
        );
        closeDeleteUnitImage();
    };

    // ==================================================
    // UNIT CRUD
    // ==================================================
    const addBusinessUnit = () => {
        setBusinessUnits((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: "",
                description: "",
                image: null,
                preview: "",
                imagePosition: "right",
            },
        ]);
    };

    const removeBusinessUnit = (id) => {
        setBusinessUnits((prev) => prev.filter((unit) => unit.id !== id));
    };

    const updateBusinessUnit = (id, field, value) => {
        setBusinessUnits((prev) =>
            prev.map((unit) =>
                unit.id === id ? { ...unit, [field]: value } : unit
            )
        );
    };

    const updateLayoutPosition = (id, position) => {
        setBusinessUnits((prev) =>
            prev.map((unit) =>
                unit.id === id ? { ...unit, imagePosition: position } : unit
            )
        );
    };

    // ==================================================
    // ACTIONS
    // ==================================================
    const handleReset = () => {
        setHero(getBusinessHero());
        setCompanyDescription(getCompanyDescription());
        setBusinessUnits(getBusinessUnits());
        setHeroPreview("");
    };

    const handleSave = () => {
        console.log("save business page");
        // API integration nanti bisa ditambahkan di sini
    };

    return {
        hero,
        heroPreview,
        editHeroOpen,
        deleteHeroOpen,
        openEditHero,
        closeEditHero,
        openDeleteHero,
        closeDeleteHero,
        uploadHeroImage,
        deleteHeroImage,

        companyDescription,
        setCompanyDescription,

        businessUnits,
        selectedUnitId,
        editUnitImageOpen,
        deleteUnitImageOpen,
        openEditUnitImage,
        closeEditUnitImage,
        openDeleteUnitImage,
        closeDeleteUnitImage,
        uploadUnitImage,
        deleteUnitImage,
        addBusinessUnit,
        removeBusinessUnit,
        updateBusinessUnit,
        updateLayoutPosition,

        handleReset,
        handleSave,
    };
}