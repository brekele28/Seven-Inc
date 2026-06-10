import { useState } from "react";

import footerRepository from "../../../services/admin/footer/repository/footerRepository";

export default function useFooter() {
    const repository = footerRepository();

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        type: null,
        id: null,
    });

    const [editModal, setEditModal] = useState({
        open: false,
        type: null,
        data: null,
    });

    const openDelete = (type, id) => {
        setDeleteModal({
            open: true,
            type,
            id,
        });
    };

    const closeDelete = () => {
        setDeleteModal({
            open: false,
            type: null,
            id: null,
        });
    };

    const openEdit = (type, data) => {
        setEditModal({
            open: true,
            type,
            data,
        });
    };

    const closeEdit = () => {
        setEditModal({
            open: false,
            type: null,
            data: null,
        });
    };

    const confirmDelete = () => {
        closeDelete();
    };

    return {
        socialItems: repository.socials,
        addressItems: repository.addresses,
        contactItems: repository.contacts,

        deleteModal,
        editModal,

        openDelete,
        closeDelete,
        confirmDelete,

        openEdit,
        closeEdit,
    };
}