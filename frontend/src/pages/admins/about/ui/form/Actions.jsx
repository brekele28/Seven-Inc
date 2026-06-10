import EditButton from "../../../../../components/admin/about/buttons/EditButton";
import PrimaryButton from "../../../../../components/admin/about/buttons/PrimaryButton";
import SecondaryButton from "../../../../../components/admin/about/buttons/SecondaryButton";

export default function Actions({
    isEditing,
    onEdit,
    onReset,
    onSave,
}) {
    return (
        <section className="sticky bottom-4 z-20 overflow-hidden rounded-[32px] border border-neutral-200 bg-white/90 backdrop-blur shadow-sm">
            <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-7">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                    Actions
                </p>

                <h2 className="mt-2 text-[22px] font-black text-neutral-950 sm:text-[28px]">
                    Kelola Perubahan Data
                </h2>

                <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500">
                    Aktifkan mode edit terlebih dahulu sebelum melakukan
                    perubahan data pada halaman About Company.
                </p>
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:justify-end sm:p-7">
                {!isEditing && (
                    <EditButton onClick={onEdit}>
                        Edit Data
                    </EditButton>
                )}

                <SecondaryButton
                    onClick={onReset}
                    className={
                        !isEditing
                            ? "pointer-events-none opacity-50"
                            : ""
                    }
                >
                    Reset
                </SecondaryButton>

                <PrimaryButton
                    onClick={onSave}
                    className={
                        !isEditing
                            ? "pointer-events-none opacity-50"
                            : ""
                    }
                >
                    Simpan
                </PrimaryButton>
            </div>
        </section>
    );
}