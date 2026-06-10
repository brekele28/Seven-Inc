import Hero from "./components/hero/Hero";
import Prinsip from "./components/prinsip/Prinsip";
import Positions from "./components/positions/Positions";

import useLowonganKerja from "../../../hooks/user/loker/useLowonganKerja";
import { getLowonganKerjaHero, getPositionsSection } from "../../../pages/users/lowongankerja/repository/lowongankerja.repository";

export default function LowonganKerja() {
    const hero = getLowonganKerjaHero();
    const positions = getPositionsSection();

    const {
        jobs,
        canLoadMore,
        isLoadingMore,
        onJobClick,
        onLoadMore,
    } = useLowonganKerja();

    return (
        <>
            <Hero
                eyebrow={hero.eyebrow}
                title={hero.title}
                subtitle={hero.subtitle}
                imageSrc={hero.imageSrc}
                imageAlt={hero.imageAlt}
            />

            <Prinsip />

            <Positions
                eyebrow={positions.eyebrow}
                title={positions.title}
                jobs={jobs}
                onJobClick={onJobClick}
                canLoadMore={canLoadMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={onLoadMore}
            />
        </>
    );
}