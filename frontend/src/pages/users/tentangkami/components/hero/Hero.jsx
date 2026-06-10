import HeroHeader from "./HeroHeader";
import HeroImage from "./HeroImage";

export default function Hero({ eyebrow, title, imageSrc, imageAlt }) {
    return (
        <section className="bg-white" aria-labelledby="about-title">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">
                {/* Left: Text */}
                <HeroHeader eyebrow={eyebrow} title={title} />

                {/* Right: Image */}
                <HeroImage src={imageSrc} alt={imageAlt} />
            </div>
        </section>
    );
}