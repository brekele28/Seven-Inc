import PrinsipHeader from "./PrinsipHeader";
import PrinsipNav from "./PrinsipNav";
import PrinsipGrid from "./PrinsipGrid";

import usePrinciplesCarousel from "../../../../../hooks/user/tentangkami/usePrinciplesCarousel";

export default function Prinsip({ principles = [] }) {
    const {
        activeIndex,
        canPrev,
        canNext,
        handlePrev,
        handleNext,
    } = usePrinciplesCarousel(principles);

    return (
        <section className="bg-white py-16 lg:py-4" aria-labelledby="principle-title">
            <div className="grid grid-cols-1 lg:grid-cols-10 items-center gap-10 lg:gap-16">
                {/* LEFT */}
                <div className="lg:col-span-5">
                    <PrinsipHeader />
                    <PrinsipNav
                        canPrev={canPrev}
                        canNext={canNext}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-5">
                    <PrinsipGrid principles={principles} activeIndex={activeIndex} />
                </div>
            </div>
        </section>
    );
}