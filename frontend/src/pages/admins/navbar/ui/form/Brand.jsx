import useNavbar from "../../../../../hooks/admin/navbar/useNavbar";

import SectionCard from "../../../../../components/admin/navbar/layout/SectionCard";
import SectionHeader from "../../../../../components/admin/navbar/layout/SectionHeader";

import NavbarLogoCard from "../../../../../components/admin/navbar/cards/NavbarLogoCard";

import EditNavbarLogoModal from "../../../../../components/admin/navbar/modal/EditNavbarLogoModal";

import DeleteConfirmModal from "../../../../../components/admin/internship/modal/DeleteConfirmModal";

export default function Brand() {
    const {
        logo,

        isEditOpen,
        isDeleteOpen,

        openEdit,
        closeEdit,

        openDelete,
        closeDelete,

        handleUpload,
        handleDelete,
    } = useNavbar();

    return (
        <>
            <SectionCard>
                <SectionHeader
                    badge="Navbar Section"
                    title="Logo Navbar"
                    description="Kelola logo navbar perusahaan Seven INC."
                />

                <NavbarLogoCard
                    logo={logo}
                    onChange={handleUpload}
                    onEdit={openEdit}
                    onDelete={openDelete}
                />
            </SectionCard>

            <EditNavbarLogoModal
                open={isEditOpen}
                onClose={closeEdit}
                onChange={handleUpload}
            />

            <DeleteConfirmModal
                open={isDeleteOpen}
                onClose={closeDelete}
                onConfirm={handleDelete}
                title="Hapus Logo Navbar"
                description="Logo navbar akan dihapus permanen dari tampilan website."
            />
        </>
    );
}