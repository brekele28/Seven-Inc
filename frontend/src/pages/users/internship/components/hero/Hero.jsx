import HeroHeader from "./HeroHeader";
import HeroImage from "./HeroImage";

export default function Hero({ eyebrow, title, imageSrc, imageAlt }) {
    return (
        <section aria-labelledby="internship-hero-title">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left */}
                <HeroHeader eyebrow={eyebrow} title={title} />

                {/* Right */}
                <HeroImage src={imageSrc} alt={imageAlt} />
            </div>
        </section>
    );
}