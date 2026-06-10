import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";

export default function Hero() {
    return (
        <section id="home-hero" className="relative -mt-30">
            {/* Full-bleed wrapper (stabil) */}
            <div className="relative h-140 md:h-155 overflow-hidden w-screen left-1/2 -translate-x-1/2">
                <HeroImage />
                <HeroContent />
            </div>
        </section>
    );
}