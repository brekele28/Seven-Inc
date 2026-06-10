import HeroImage from "./HeroImage";
import HeroHeader from "./HeroHeader";

export default function Hero() {
    return (
        <section aria-labelledby="berita-hero-title" className="bg-white">
            {/* HERO (full-bleed) */}
            <div
                className="
          relative z-0
          -mt-30
          w-screen
          left-1/2 right-1/2
          -ml-[50vw] -mr-[50vw]
        "
            >
                <div className="relative h-82.5 md:h-95 w-full overflow-hidden">
                    <HeroImage />
                    <HeroHeader />
                </div>
            </div>
        </section>
    );
}