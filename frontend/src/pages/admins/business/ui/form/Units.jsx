import Item from "./Item";

export default function Units({
    businessUnits,
    addUnit,
    removeUnit,
    updateBusinessUnit,
    updateLayoutPosition,
    openEditUnitImage,
    openDeleteUnitImage,
}) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 bg-gradient-to-br from-red-50 via-white to-white px-5 py-6 sm:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.38em] text-red-600 sm:text-[11px]">
                            Business Units
                        </p>

                        <h2 className="mt-2 text-[24px] font-black leading-tight text-neutral-950 sm:text-[32px]">
                            Kelola Unit Bisnis
                        </h2>

                        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                            Atur title, deskripsi, layout, dan visual masing-masing
                            unit bisnis Seven INC.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addUnit}
                        className="cursor-pointer rounded-2xl bg-red-600 px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
                    >
                        Tambah Unit
                    </button>
                </div>
            </div>

            <div className="space-y-6 px-5 py-6 sm:px-8">
                {businessUnits.map((unit) => (
                    <Item
                        key={unit.id}
                        unit={unit}
                        updateBusinessUnit={updateBusinessUnit}
                        updateLayoutPosition={updateLayoutPosition}
                        openEditUnitImage={openEditUnitImage}
                        openDeleteUnitImage={openDeleteUnitImage}
                    />
                ))}
            </div>
        </section>
    );
}