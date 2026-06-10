import { Plus, Trash2 } from "lucide-react";
import SectionItemInput from "./SectionItemInput";

export default function DetailSectionForm({
    sections = [],
    onChangeSectionTitle,
    onChangeSectionItem,
    onAddSectionItem,
    onRemoveSectionItem,
    onAddSection,
    onRemoveSection,
}) {
    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-[14px] font-black text-neutral-950">
                        Detail Kualifikasi
                    </h3>

                    <p className="mt-1 text-[12px] leading-6 text-neutral-500">
                        Buat section seperti kualifikasi umum, kualifikasi khusus,
                        tanggung jawab, dan benefit sesuai posisi lowongan.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAddSection}
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-[12px] font-extrabold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
                >
                    <Plus className="h-4 w-4" />
                    Tambah Section
                </button>
            </div>

            <div className="mt-5 space-y-5">
                {sections.map((section, sectionIndex) => (
                    <div
                        key={section.id || sectionIndex}
                        className="rounded-3xl border border-neutral-200 bg-neutral-50/60 p-4"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                value={section.title}
                                onChange={(e) =>
                                    onChangeSectionTitle?.(sectionIndex, e.target.value)
                                }
                                placeholder="Judul section, contoh: KUALIFIKASI UMUM"
                                className="h-11 flex-1 rounded-2xl border border-neutral-200 bg-white px-4 text-[12px] font-black uppercase tracking-[0.12em] text-neutral-900 outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
                            />

                            <button
                                type="button"
                                onClick={() => onRemoveSection?.(sectionIndex)}
                                disabled={sections.length <= 1}
                                className={[
                                    "inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition",
                                    sections.length > 1
                                        ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                                        : "cursor-not-allowed border-neutral-100 bg-neutral-100 text-neutral-300",
                                ].join(" ")}
                                aria-label="Hapus section"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-3 space-y-2">
                            {(section.items || []).map((item, itemIndex) => (
                                <SectionItemInput
                                    key={`${section.id}-${itemIndex}`}
                                    value={item}
                                    onChange={(value) =>
                                        onChangeSectionItem?.(sectionIndex, itemIndex, value)
                                    }
                                    onRemove={() =>
                                        onRemoveSectionItem?.(sectionIndex, itemIndex)
                                    }
                                    onAdd={() => onAddSectionItem?.(sectionIndex)}
                                    canRemove={(section.items || []).length > 1}
                                    isLast={itemIndex === (section.items || []).length - 1}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}