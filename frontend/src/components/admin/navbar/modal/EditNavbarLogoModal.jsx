import SecondaryButton from "../../internship/buttons/SecondaryButton";
import PrimaryButton from "../../internship/buttons/PrimaryButton";

export default function EditNavbarLogoModal({
    open,
    onClose,
    onChange,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-[32px] border border-neutral-200 bg-white shadow-2xl">
                <div className="border-b border-neutral-100 px-5 py-5 sm:px-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                        Edit Logo
                    </p>

                    <h3 className="mt-2 text-[28px] font-black text-neutral-950">
                        Edit Navbar Logo
                    </h3>
                </div>

                <div className="space-y-6 px-5 py-6 sm:px-7">
                    <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-neutral-300 bg-gradient-to-br from-red-50/50 via-white to-white p-6 transition duration-300 hover:border-red-300">
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp"
                            onChange={onChange}
                            className="hidden"
                        />

                        <p className="text-center text-[15px] font-bold text-neutral-700">
                            Klik untuk upload logo baru
                        </p>
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <SecondaryButton
                            type="button"
                            onClick={onClose}
                        >
                            Batal
                        </SecondaryButton>

                        <PrimaryButton
                            type="button"
                            onClick={onClose}
                        >
                            Simpan
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}