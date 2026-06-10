import useFooter from "../../../hooks/admin/footer/useFooter";

import Hero from "./ui/form/Hero";
import Socials from "./ui/form/Socials";
import Address from "./ui/form/Address";
import Contacts from "./ui/form/Contacts";
import Actions from "./ui/form/Actions";

import DeleteConfirmModal from "../../../components/admin/footer/modal/DeleteConfirmModal";
import EditFooterModal from "../../../components/admin/footer/modal/EditFooterModal";

export default function AdminFooter() {
    const {
        socialItems,
        addressItems,
        contactItems,

        deleteModal,
        editModal,

        openDelete,
        closeDelete,
        confirmDelete,

        openEdit,
        closeEdit,
    } = useFooter();

    return (
        <>
            <div className="space-y-6">
                <Hero />

                <Socials
                    items={socialItems}
                    openEdit={openEdit}
                    openDelete={openDelete}
                />

                <Address
                    items={addressItems}
                    openEdit={openEdit}
                    openDelete={openDelete}
                />

                <Contacts
                    items={contactItems}
                    openEdit={openEdit}
                    openDelete={openDelete}
                />

                <Actions />
            </div>

            <DeleteConfirmModal
                open={deleteModal.open}
                onClose={closeDelete}
                onConfirm={confirmDelete}
            />

            <EditFooterModal
                open={editModal.open}
                onClose={closeEdit}
                title="Edit Footer Data"
            />
        </>
    );
}