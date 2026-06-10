import Hero from "./Hero";
import Career from "./Career";
import Actions from "./Actions";

import ConfirmDeleteModal from "../../../../../../components/admin/tampilan/modal/ConfirmDeleteModal";
import ConfirmSaveModal from "../../../../../../components/admin/tampilan/modal/ConfirmSaveModal";

export default function Section(props) {
    return (
        <>
            <div className="space-y-6 pb-10">
                <Hero {...props} />

                <Career {...props} />

                <Actions {...props} />
            </div>

            <ConfirmDeleteModal
                open={props.isConfirmDeleteOpen}
                onClose={props.closeConfirmDelete}
                onConfirm={props.handleReset}
            />

            <ConfirmSaveModal
                open={props.isConfirmSaveOpen}
                onClose={props.closeConfirmSave}
                onConfirm={props.handleSave}
            />
        </>
    );
}