import { useEffect, useState } from "react";

import {
    getTampilan,
    resetTampilan,
    saveTampilan,
} from "../../../services/admin/tampilan/repository/tampilanRepository";

export default function useTampilan() {
    const [form, setForm] = useState(getTampilan());

    const [isEditing, setIsEditing] = useState(false);

    const [imagePreview, setImagePreview] = useState(null);

    const [isEditImageOpen, setIsEditImageOpen] = useState(false);
    const [isDeleteImageOpen, setIsDeleteImageOpen] = useState(false);

    const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const updateField = (field, value) => {
        if (!isEditing) return;

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const openEditMode = () => {
        setIsEditing(true);
    };

    const closeEditMode = () => {
        setIsEditing(false);
    };

    const openEditImage = () => {
        if (!isEditing) return;
        setIsEditImageOpen(true);
    };

    const closeEditImage = () => {
        setIsEditImageOpen(false);
    };

    const openDeleteImage = () => {
        if (!isEditing) return;
        setIsDeleteImageOpen(true);
    };

    const closeDeleteImage = () => {
        setIsDeleteImageOpen(false);
    };

    const openConfirmSave = () => {
        if (!isEditing) return;
        setIsConfirmSaveOpen(true);
    };

    const closeConfirmSave = () => {
        setIsConfirmSaveOpen(false);
    };

    const openConfirmDelete = () => {
        setIsConfirmDeleteOpen(true);
    };

    const closeConfirmDelete = () => {
        setIsConfirmDeleteOpen(false);
    };

    const handleImageChange = (file) => {
        if (!file) return;

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        const previewUrl = URL.createObjectURL(file);

        setImagePreview(previewUrl);

        setForm((prev) => ({
            ...prev,
            heroImage: file,
        }));

        closeEditImage();
    };

    const handleDeleteImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImagePreview(null);

        setForm((prev) => ({
            ...prev,
            heroImage: null,
        }));

        closeDeleteImage();
    };

    const handleReset = async () => {
        const initialData = await resetTampilan();

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImagePreview(null);

        setForm(initialData);

        closeConfirmDelete();
        closeEditMode();
    };

    const handleSave = async () => {
        await saveTampilan(form);

        closeConfirmSave();
        closeEditMode();
    };

    return {
        form,

        isEditing,

        imagePreview,

        updateField,

        openEditMode,
        closeEditMode,

        isEditImageOpen,
        isDeleteImageOpen,

        isConfirmSaveOpen,
        isConfirmDeleteOpen,

        openEditImage,
        closeEditImage,

        openDeleteImage,
        closeDeleteImage,

        openConfirmSave,
        closeConfirmSave,

        openConfirmDelete,
        closeConfirmDelete,

        handleImageChange,
        handleDeleteImage,

        handleReset,
        handleSave,
    };
}