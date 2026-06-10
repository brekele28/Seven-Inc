import NewsHeader from "./NewsHeader";
import NewsControls from "./NewsControls";
import NewsCarousel from "./NewsCarousel";

import useResponsiveItemsPerPage from "../../../../../hooks/user/beranda/useResponsiveItemsPerPage";
import useCarousel from "../../../../../hooks/user/beranda/useCarousel";

import { DUMMY_NEWS } from "../../../../../services/user/beranda/newsDummy";

export default function News() {
    const itemsPerPage = useResponsiveItemsPerPage({ mobile: 1, desktop: 3, breakpointPx: 768 });

    const carousel = useCarousel({
        total: DUMMY_NEWS.length,
        itemsPerPage,
    });

    return (
        <section className="bg-white py-14 md:py-20 overflow-hidden">
            <div className="flex items-start justify-between gap-6 mb-10">
                <NewsHeader />

                <NewsControls
                    canPrev={carousel.canPrev}
                    canNext={carousel.canNext}
                    onPrev={carousel.handlePrev}
                    onNext={carousel.handleNext}
                />
            </div>

            <NewsCarousel
                items={DUMMY_NEWS}
                currentIndex={carousel.currentIndex}
                itemsPerPage={itemsPerPage}
            />
        </section>
    );
}