import FeaturedAction from "./FeaturedAction";

export default function FeaturedContent() {
    return (
        <div className="px-8 py-8 md:px-10 md:py-10">
            <p className="text-[12px] font-semibold text-red-500">28 Jul 2025</p>

            <h2
                id="featured-news-title"
                className="mt-3 max-w-140 text-[18px] md:text-[20px] font-extrabold leading-tight text-neutral-900"
            >
                Integritas dan Disiplin, Dua Pilar Penting Pembentukan SDM Berkualitas di Seven INC.
            </h2>

            <FeaturedAction />
        </div>
    );
}