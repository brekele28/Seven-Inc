import { X } from "lucide-react";

export default function EditImageModal({
    open,
    onClose,
    onChange,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-black text-neutral-950">
                        Edit Gambar
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <X />
                    </button>
                </div>

                <div className="mt-6">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(event) =>
                            onChange?.(event.target.files?.[0])
                        }
                        className="w-full cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}