import UploadField from "../../../../../components/admin/business/fields/UploadField";

export default function Item({
    unit,
    updateBusinessUnit,
    updateLayoutPosition,

    openEditUnitImage,
    openDeleteUnitImage,
}) {
    return (
        <div className="rounded-[28px] border border-neutral-200 bg-neutral-50/60 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                            Title
                        </label>

                        <input
                            type="text"
                            value={unit.title}
                            onChange={(e) =>
                                updateBusinessUnit(
                                    unit.id,
                                    "title",
                                    e.target.value
                                )
                            }
                            className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] font-semibold outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                            Description
                        </label>

                        <textarea
                            rows={8}
                            value={unit.description}
                            onChange={(e) =>
                                updateBusinessUnit(
                                    unit.id,
                                    "description",
                                    e.target.value
                                )
                            }
                            placeholder="Deskripsi unit bisnis..."
                            className="w-full rounded-3xl border border-neutral-200 bg-white px-5 py-5 text-[14px] leading-loose outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                            Layout Position
                        </label>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    updateLayoutPosition(
                                        unit.id,
                                        "right"
                                    )
                                }
                                className={`cursor-pointer rounded-2xl px-5 py-3 text-[13px] font-bold transition ${
                                    unit.imagePosition === "right"
                                        ? "border border-red-200 bg-red-50 text-red-600"
                                        : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
                                }`}
                            >
                                Image Right
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    updateLayoutPosition(
                                        unit.id,
                                        "left"
                                    )
                                }
                                className={`cursor-pointer rounded-2xl px-5 py-3 text-[13px] font-bold transition ${
                                    unit.imagePosition === "left"
                                        ? "border border-red-200 bg-red-50 text-red-600"
                                        : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
                                }`}
                            >
                                Image Left
                            </button>
                        </div>
                    </div>
                </div>

                <UploadField
                    label="Upload Image"
                    image={unit.preview}
                    onEdit={() =>
                        openEditUnitImage(unit.id)
                    }
                    onDelete={() =>
                        openDeleteUnitImage(unit.id)
                    }
                />
            </div>
        </div>
    );
}