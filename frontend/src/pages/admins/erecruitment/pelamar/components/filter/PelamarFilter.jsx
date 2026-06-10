import SearchInput from "./SearchInput";
import PositionFilter from "./PositionFilter";
import StatusTabs from "./StatusTabs";

export default function PelamarFilter({
    search,
    onSearchChange,
    position,
    onPositionChange,
    status,
    onStatusChange,
    positionOptions = [],
    statusOptions = [],
    onReset,
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_260px_auto] xl:items-center">
                <SearchInput value={search} onChange={onSearchChange} />

                <PositionFilter
                    value={position}
                    onChange={onPositionChange}
                    options={positionOptions}
                />

                <button
                    type="button"
                    onClick={onReset}
                    className={[
                        "h-12 rounded-2xl border border-neutral-200 bg-white px-5",
                        "text-[12px] font-extrabold text-neutral-700",
                        "transition hover:bg-neutral-50 active:scale-[0.99]",
                    ].join(" ")}
                >
                    Reset
                </button>
            </div>

            <div className="mt-4">
                <StatusTabs
                    value={status}
                    onChange={onStatusChange}
                    options={statusOptions}
                />
            </div>
        </div>
    );
}