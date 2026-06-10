import HeroTitle from "./HeroTitle";
import HeroImage from "./HeroImage";

export default function Hero({ eyebrow, title, subtitle, imageSrc, imageAlt }) {
    return (
        <section aria-labelledby="loker-hero-title" className="pb-3 md:pb-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                    <p className="text-[12px] font-semibold tracking-[0.45em] text-neutral-700 uppercase">
                        {eyebrow}
                    </p>

                    <HeroTitle title={title} />

                    <p className="mt-4 max-w-105 text-[13px] lg:text-[14px] leading-[1.9] text-neutral-600">
                        {subtitle}
                    </p>
                </div>

                <div className="lg:pl-6">
                    <HeroImage src={imageSrc} alt={imageAlt} />
                </div>
            </div>
        </section>
    );
}