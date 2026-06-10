import NewsCard from "./NewsCard";

export default function NewsCarousel({ items = [], currentIndex, itemsPerPage }) {
    return (
        <div className="relative -mx-3.5">
            <div className="overflow-hidden px-3.5 py-4">
                <div
                    className="flex transition-transform duration-500 ease-out will-change-transform"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                    }}
                >
                    {items.map((news) => (
                        <div key={news.id} className="w-full md:w-1/3 shrink-0 px-3.5">
                            <NewsCard news={news} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}