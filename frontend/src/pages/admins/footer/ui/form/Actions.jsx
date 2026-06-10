import PrimaryButton from "../../../../../components/admin/footer/buttons/PrimaryButton";
import SecondaryButton from "../../../../../components/admin/footer/buttons/SecondaryButton";
import SectionCard from "../../../../../components/admin/footer/layout/SectionCard";

export default function Actions() {
    return (
        <SectionCard>
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                    <h3 className="text-[24px] font-black text-neutral-950">
                        Simpan Perubahan
                    </h3>

                    <p className="mt-2 text-[13px] text-neutral-500">
                        Pastikan seluruh data footer sudah benar.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <SecondaryButton>
                        Reset
                    </SecondaryButton>

                    <PrimaryButton>
                        Simpan
                    </PrimaryButton>
                </div>
            </div>
        </SectionCard>
    );
}