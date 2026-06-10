import PositionsHeader from "./PositionsHeader";
import JobList from "./JobList";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";

export default function Positions({
    eyebrow,
    title,
    jobs,
    onJobClick,
    isLoadingMore = false,
    canLoadMore = false,
    onLoadMore,
}) {
    return (
        <section className="bg-white py-14 md:py-18" aria-labelledby="loker-positions-title">
            <PositionsHeader eyebrow={eyebrow} title={title} />

            <div className="mt-10 space-y-6">
                <JobList jobs={jobs} onJobClick={onJobClick} />
            </div>

            {isLoadingMore ? (
                <Loader />
            ) : canLoadMore ? (
                <LoadMoreButton onClick={onLoadMore} />
            ) : null}
        </section>
    );
}