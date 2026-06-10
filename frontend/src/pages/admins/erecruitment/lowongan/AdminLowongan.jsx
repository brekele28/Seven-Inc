import useLowongan from "../../../../hooks/admin/lowongan/useLowongan";

import LowonganHeader from "./components/header/LowonganHeader";
import LowonganFilter from "./components/filter/LowonganFilter";
import LowonganTable from "./components/table/LowonganTable";
import LowonganDetail from "./components/detail/LowonganDetail";
import LowonganForm from "./components/form/LowonganForm";

import ConfirmDialog from "../../../../components/admin/lowongan/modal/ConfirmDialog";

export default function AdminLowongan() {
    const lowongan = useLowongan();

    return (
        <section className="space-y-6">
            <LowonganHeader
                stats={lowongan.stats}
                onCreate={lowongan.openCreateForm}
            />

            <LowonganFilter
                query={lowongan.query}
                onChangeQuery={lowongan.setQuery}
                status={lowongan.status}
                onChangeStatus={lowongan.setStatus}
                sort={lowongan.sort}
                onChangeSort={lowongan.setSort}
                onReset={lowongan.resetFilter}
            />

            <LowonganTable
                items={lowongan.filteredItems}
                selectedId={lowongan.selectedId}
                onSelect={lowongan.setSelectedId}
                onEdit={lowongan.openEditForm}
                onClose={lowongan.requestCloseLowongan}
                onDelete={lowongan.requestDeleteLowongan}
                onPublish={lowongan.handlePublish}
            />

            <LowonganDetail
                item={lowongan.selectedItem}
                onEdit={lowongan.openEditForm}
                onClose={lowongan.requestCloseLowongan}
                onDelete={lowongan.requestDeleteLowongan}
                onPublish={lowongan.handlePublish}
            />

            <LowonganForm
                open={lowongan.formOpen}
                mode={lowongan.formMode}
                values={lowongan.formValues}
                error={lowongan.formError}
                onClose={lowongan.closeForm}
                onSubmit={lowongan.submitForm}
                onChangeField={lowongan.updateFormField}
                onChangeSectionTitle={lowongan.updateSectionTitle}
                onChangeSectionItem={lowongan.updateSectionItem}
                onAddSectionItem={lowongan.addSectionItem}
                onRemoveSectionItem={lowongan.removeSectionItem}
                onAddSection={lowongan.addSection}
                onRemoveSection={lowongan.removeSection}
            />

            <ConfirmDialog
                open={lowongan.confirmState.open}
                title={lowongan.confirmState.title}
                description={lowongan.confirmState.description}
                confirmText={lowongan.confirmState.confirmText}
                onCancel={lowongan.cancelConfirm}
                onConfirm={lowongan.confirmAction}
            />
        </section>
    );
}