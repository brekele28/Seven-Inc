import useNews from "../../../hooks/admin/news/useNews";

import Section from "./ui/layout/Section";
import Create from "./ui/modal/Create";

export default function AdminNews() {
    const {
        mode,
        selectedNews,
        isModalOpen,

        openCreate,
        openDetail,
        openEdit,
        closeModal,
        copyLink,
    } = useNews();

    return (
        <>
            <div className="space-y-6">
                <Section
                    onCreate={openCreate}
                    onDetail={openDetail}
                    onEdit={openEdit}
                    onCopy={copyLink}
                />
            </div>

            <Create
                mode={mode}
                data={selectedNews}
                open={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}