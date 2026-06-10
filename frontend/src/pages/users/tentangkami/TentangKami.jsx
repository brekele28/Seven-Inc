import Hero from "./components/hero/Hero";
import Story from "./components/story/Story";
import Prinsip from "./components/prinsip/Prinsip";

import {
    getHero,
    getStory,
    getPrinciples,
} from "../../../services/user/tentangkami/tentangkamiRepository";

export default function TentangKami() {
    const hero = getHero();
    const story = getStory();
    const principles = getPrinciples();

    return (
        <>
            <Hero
                eyebrow={hero.eyebrow}
                title={hero.title}
                imageSrc={hero.imageSrc}
                imageAlt={hero.imageAlt}
            />

            <Story left={story.left} right={story.right} />

            <Prinsip principles={principles} />
        </>
    );
}