import EditButton from "../buttons/EditButton";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function FormActions({
    isEditing,
    onEdit,
    onDelete,
    onSave,
}) {
    return (
        <section className="sticky bottom-4 z-20 rounded-[28px] border border-neutral-200 bg-white/90 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 className="text-[20px] font-black text-neutral-950">
                        Simpan Perubahan?
                    </h3>

                    <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-500">
                        Pastikan seluruh data sudah sesuai sebelum dipublikasikan.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                    {!isEditing && (
                        <EditButton onClick={onEdit}>
                            Edit
                        </EditButton>
                    )}
                    
                    <SecondaryButton onClick={onDelete}>
                        Hapus
                    </SecondaryButton>
                    
                    <PrimaryButton
                        onClick={onSave}
                        className={!isEditing ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        Simpan
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
}