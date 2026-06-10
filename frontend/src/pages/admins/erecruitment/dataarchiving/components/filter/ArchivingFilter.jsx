import SearchInput from "./SearchInput";
import PositionFilter from "./PositionFilter";
import YearFilter from "./YearFilter";

export default function ArchivingFilter({
    search,
    onSearchChange,
    position,
    onPositionChange,
    year,
    onYearChange,
    positionOptions = [],
    yearOptions = [],
    onReset,
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_260px_220px_auto] xl:items-center">
                <SearchInput value={search} onChange={onSearchChange} />

                <PositionFilter
                    value={position}
                    onChange={onPositionChange}
                    options={positionOptions}
                />

                <YearFilter
                    value={year}
                    onChange={onYearChange}
                    options={yearOptions}
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
        </div>
    );
}