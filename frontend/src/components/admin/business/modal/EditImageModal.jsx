import { useRef } from "react";

import {
    ImagePlus,
    X,
} from "lucide-react";

import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function EditImageModal({
    open,
    onClose,
    onUpload,
}) {
    const inputRef = useRef(null);

    if (!open) return null;

    const chooseFile = () => {
        inputRef.current?.click();
    };

    const handleChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        onUpload(file);
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl">
                <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white p-7">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                                Edit Image
                            </p>

                            <h2 className="mt-2 text-[28px] font-black text-neutral-950">
                                Ganti Gambar
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 transition hover:bg-neutral-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-7">
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleChange}
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={chooseFile}
                        className="flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-neutral-300 bg-neutral-50 transition duration-300 hover:border-red-300"
                    >
                        <ImagePlus className="h-12 w-12 text-red-500" />

                        <p className="mt-4 text-[15px] font-bold text-neutral-900">
                            Pilih Gambar Baru
                        </p>

                        <p className="mt-2 text-[13px] text-neutral-500">
                            JPG, PNG, WEBP
                        </p>
                    </button>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={onClose}>
                            Batal
                        </SecondaryButton>

                        <PrimaryButton onClick={chooseFile}>
                            Pilih Gambar
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}