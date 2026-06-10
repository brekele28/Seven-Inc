import BusinessCard from "./BusinessCard";

export default function BusinessGrid({ items = [], onPick }) {
    const handleKeyDown = (e, targetId) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPick?.(targetId);
        }
    };

    return (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {items.map((item) => (
                <BusinessCard
                    key={item.title}
                    title={item.title}
                    img={item.img}
                    onClick={() => onPick?.(item.targetId)}
                    onKeyDown={(e) => handleKeyDown(e, item.targetId)}
                />
            ))}
        </div>
    );
}