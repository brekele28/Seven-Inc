import Hero from "./Hero";
import Intro from "./Intro";
import Units from "./Units";
import Actions from "./Actions";

export default function Section() {
    return (
        <div className="space-y-6 pb-10">
            <Hero />
            <Intro />
            <Units />
            <Actions />
        </div>
    );
}