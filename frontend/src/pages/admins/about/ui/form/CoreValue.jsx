import AboutSectionCard from "../../../../../components/admin/about/cards/AboutSectionCard";

export default function CoreValue({
    coreValue,
    updateCoreValue,
    isEditing,
}) {
    return (
        <AboutSectionCard>
            <div className="rounded-t-[32px] border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-7">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                    Core Value Section
                </p>

                <h2 className="mt-2 text-[22px] font-black text-neutral-950 sm:text-[28px]">
                    Core Value Perusahaan
                </h2>

                <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                    Kelola badge, heading, dan deskripsi utama sebelum
                    pengunjung melihat slider core value perusahaan.
                </p>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Badge Label
                    </label>

                    <input
                        type="text"
                        value={coreValue.badge}
                        readOnly={!isEditing}
                        onChange={(event) =>
                            updateCoreValue(
                                "badge",
                                event.target.value
                            )
                        }
                        placeholder="CORE VALUE"
                        className={`
                            h-12 w-full rounded-2xl border px-4 text-[14px]
                            outline-none transition

                            ${
                                isEditing
                                    ? "border-neutral-200 bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                    : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-600"
                            }
                        `}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Heading
                    </label>

                    <textarea
                        rows={3}
                        value={coreValue.title}
                        readOnly={!isEditing}
                        onChange={(event) =>
                            updateCoreValue(
                                "title",
                                event.target.value
                            )
                        }
                        placeholder="Tumbuh Bersama Nilai Yang Kami Percaya"
                        className={`
                            w-full rounded-2xl border px-4 py-4 text-[14px]
                            outline-none transition

                            ${
                                isEditing
                                    ? "border-neutral-200 bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                    : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-600"
                            }
                        `}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        value={coreValue.description}
                        readOnly={!isEditing}
                        onChange={(event) =>
                            updateCoreValue(
                                "description",
                                event.target.value
                            )
                        }
                        placeholder="Silakan isi deskripsi core value perusahaan..."
                        className={`
                            w-full rounded-2xl border px-4 py-4 text-[14px]
                            outline-none transition

                            ${
                                isEditing
                                    ? "border-neutral-200 bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                    : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-600"
                            }
                        `}
                    />
                </div>
            </div>
        </AboutSectionCard>
    );
}