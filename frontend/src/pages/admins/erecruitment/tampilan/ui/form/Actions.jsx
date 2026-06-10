import FormActions from "../../../../../../components/admin/tampilan/actions/FormActions";

export default function Actions({
    isEditing,

    openEditMode,

    openConfirmDelete,
    openConfirmSave,
}) {
    return (
        <FormActions
            isEditing={isEditing}
            onEdit={openEditMode}
            onDelete={openConfirmDelete}
            onSave={openConfirmSave}
        />
    );
}