import PrinsipCard from "./PrinsipCard";

export default function PrinsipGrid({ principles = [], activeIndex = 0 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {Array.isArray(principles)
                ? principles.map((item) => (
                    <PrinsipCard
                        key={item.title}
                        title={item.title}
                        iconSrc={item.iconSrc}
                        description={item.descriptions?.[activeIndex]}
                    />
                ))
                : null}
        </div>
    );
}