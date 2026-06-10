import EditActionButton from "../actions/EditActionButton";
import DeleteActionButton from "../actions/DeleteActionButton";

import UploadLogoField from "../fields/UploadLogoField";

export default function NavbarLogoCard({
    logo,
    onChange,
    onEdit,
    onDelete,
}) {
    return (
        <div className="space-y-5 px-5 py-5 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                <div className="flex items-center gap-3">
                    <EditActionButton onClick={onEdit} />

                    <DeleteActionButton onClick={onDelete} />
                </div>
            </div>

            <UploadLogoField
                logo={logo}
                onChange={onChange}
            />
        </div>
    );
}