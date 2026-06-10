import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";
import SortFilter from "./SortFilter";

export default function LowonganFilter({
    query,
    onChangeQuery,
    status,
    onChangeStatus,
    sort,
    onChangeSort,
    onReset,
}) {
    return (
        <div className="rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_190px_190px_auto]">
                <SearchInput value={query} onChange={onChangeQuery} />
                <StatusFilter value={status} onChange={onChangeStatus} />
                <SortFilter value={sort} onChange={onChangeSort} />

                <button
                    type="button"
                    onClick={onReset}
                    className={[
                        "h-13 rounded-2xl border border-neutral-200 bg-white px-6",
                        "text-[13px] font-extrabold text-neutral-800",
                        "shadow-sm transition hover:bg-neutral-50 active:scale-[0.99]",
                    ].join(" ")}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}