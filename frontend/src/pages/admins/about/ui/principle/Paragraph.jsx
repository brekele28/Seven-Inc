import { Trash2 } from "lucide-react";

export default function Paragraph({
    value,
    onChange,
    onDelete,
    isEditing,
}) {
    return (
        <div
            className="
                rounded-[24px]
                border border-neutral-200
                bg-neutral-100
                p-4
                transition duration-300
            "
        >
            <textarea
                rows={4}
                value={value}
                readOnly={!isEditing}
                onChange={onChange}
                placeholder="Silakan isi deskripsi core value..."
                className="
                    w-full resize-none bg-transparent
                    text-[14px] leading-relaxed text-neutral-700
                    outline-none
                "
            />

            {isEditing && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onDelete}
                        className="
                            flex items-center gap-2
                            rounded-xl border border-red-100
                            bg-red-50 px-4 py-2
                            text-[13px] font-bold text-red-600
                            transition duration-300
                            hover:bg-red-100
                            cursor-pointer
                        "
                    >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                    </button>
                </div>
            )}
        </div>
    );
}