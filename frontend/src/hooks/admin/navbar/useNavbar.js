import { useState } from "react";

import { getNavbarData } from "../../../services/admin/navbar/repository/navbarRepository";

export default function useNavbar() {
    const data = getNavbarData();

    const [logo, setLogo] = useState(data.logo.image);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openEdit = () => {
        setIsEditOpen(true);
    };

    const closeEdit = () => {
        setIsEditOpen(false);
    };

    const openDelete = () => {
        setIsDeleteOpen(true);
    };

    const closeDelete = () => {
        setIsDeleteOpen(false);
    };

    const handleUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setLogo(imageUrl);
    };

    const handleDelete = () => {
        setLogo("");

        closeDelete();
    };

    return {
        logo,

        isEditOpen,
        isDeleteOpen,

        openEdit,
        closeEdit,

        openDelete,
        closeDelete,

        handleUpload,
        handleDelete,
    };
}