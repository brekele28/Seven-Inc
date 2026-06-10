import FeaturedImage from "./FeaturedImage";
import FeaturedContent from "./FeaturedContent";

export default function FeaturedCard() {
    return (
        <article
            className="
        w-full
        rounded-2xl
        border border-neutral-200
        bg-white
        overflow-hidden
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      "
        >
            <div className="grid grid-cols-1 md:grid-cols-[360px_1fr]">
                <FeaturedImage />
                <FeaturedContent />
            </div>
        </article>
    );
}