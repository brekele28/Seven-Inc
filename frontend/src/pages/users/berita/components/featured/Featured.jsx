import FeaturedCard from "./FeaturedCard";

export default function Featured() {
    return (
        <section
            aria-labelledby="featured-news-title"
            className="relative z-20 pb-14 md:pb-18"
        >
            <div className="-mt-15 md:-mt-18">
                <FeaturedCard />
            </div>
        </section>
    );
}