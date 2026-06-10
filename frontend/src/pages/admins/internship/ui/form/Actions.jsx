import PrimaryButton from "../../../../../components/admin/internship/buttons/PrimaryButton";
import SecondaryButton from "../../../../../components/admin/internship/buttons/SecondaryButton";

export default function Actions() {
    return (
        <section className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 className="text-[24px] font-black text-neutral-950">
                        Simpan Perubahan
                    </h3>

                    <p className="mt-2 text-[14px] text-neutral-500">
                        Pastikan seluruh data internship sudah benar.
                    </p>
                </div>

                <div className="flex gap-3">
                    <SecondaryButton>
                        Reset
                    </SecondaryButton>

                    <PrimaryButton>
                        Simpan
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
}