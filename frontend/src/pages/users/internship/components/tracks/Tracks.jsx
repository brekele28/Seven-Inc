import TracksHeader from "./TracksHeader";
import TrackGrid from "./TrackGrid";

export default function Tracks({ eyebrow, title, description, items }) {
    return (
        <section aria-labelledby="internship-tracks-title" className="bg-white py-10 md:py-12">
            {/* Header */}
            <TracksHeader eyebrow={eyebrow} title={title} description={description} />

            {/* Grid */}
            <div className="mt-10">
                <TrackGrid items={items} />
            </div>
        </section>
    );
}