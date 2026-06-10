import Hero from "./components/hero/Hero";
import Prinsip from "./components/prinsip/Prinsip";
import Requirements from "./components/requirements/Requirements";
import Tracks from "./components/tracks/Tracks";
import Facilities from "./components/facilities/Facilities";
import Banner from "./components/banner/Banner";

import {
    getHero,
    getRequirements,
    getTracks,
    getFacilities,
} from "../../../services/user/internship/internshipRepository";

export default function Internship() {
    const hero = getHero();
    const requirements = getRequirements();
    const tracks = getTracks();
    const facilities = getFacilities();

    return (
        <>
            {/* 1) Hero */}
            <Hero
                eyebrow={hero.eyebrow}
                title={hero.title}
                imageSrc={hero.imageSrc}
                imageAlt={hero.imageAlt}
            />

            {/* 2) Core Value (reuse PrinsipSection) */}
            <Prinsip />

            {/* 3) Syarat & Ketentuan */}
            <Requirements
                eyebrow={requirements.eyebrow}
                title={requirements.title}
                items={requirements.items}
            />

            {/* 4) Formasi Internship */}
            <Tracks
                eyebrow={tracks.eyebrow}
                title={tracks.title}
                description={tracks.description}
                items={tracks.items}
            />

            {/* 5) Fasilitas */}
            <Facilities
                eyebrow={facilities.eyebrow}
                title={facilities.title}
                items={facilities.items}
            />

            {/* 6) CTA Banner (reuse Banner) */}
            <Banner />
        </>
    );
}