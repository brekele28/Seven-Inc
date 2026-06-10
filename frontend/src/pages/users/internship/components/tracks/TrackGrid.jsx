import TrackCard from "./TrackCard";

export default function TrackGrid({ items }) {
    return (
        <div
            className="
        grid grid-cols-2 gap-4
        sm:grid-cols-3
        md:grid-cols-6 md:gap-5
      "
        >
            {Array.isArray(items)
                ? items.map((item) => (
                    <TrackCard key={item.id} iconSrc={item.iconSrc} label={item.label} />
                ))
                : null}
        </div>
    );
}