import { Trash2 } from "lucide-react";

export default function DescriptionColumnCard({
    title,
    paragraphs,
    placeholder = "Silakan isi deskripsi perusahaan...",
    onChange,
    onDelete,
    isEditing,
}) {
    return (
        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
            <div className="rounded-t-[28px] border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5">
                <h3 className="text-[18px] font-black text-neutral-950">
                    {title}
                </h3>
            </div>

            <div className="space-y-4 p-5">
                {paragraphs.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-neutral-200 bg-neutral-100 p-4 transition duration-300"
                    >
                        <textarea
                            rows={5}
                            value={item}
                            readOnly={!isEditing}
                            onChange={(event) =>
                                onChange(index, event.target.value)
                            }
                            placeholder={placeholder}
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
                                    onClick={() => onDelete(index)}
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
                ))}
            </div>
        </div>
    );
}