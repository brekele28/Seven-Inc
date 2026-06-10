import HeroHeader from "./HeroHeader";
import HeroText from "./HeroText";

export default function Hero() {
    return (
        <section aria-labelledby="bisnis-hero-title" className="bg-white">
            <HeroHeader />
            <HeroText />
        </section>
    );
}