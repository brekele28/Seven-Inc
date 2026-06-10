import { useLocation } from "react-router";
import useHashScroll from "../../../../../hooks/user/bisniskami/useHashScroll";
import { BUSINESS_BLOCKS } from "../../../../../services/user/bisniskami/bisnisKamiDummy";

import BusinessList from "./BusinessList";

export default function Business() {
    const location = useLocation();

    // logic scroll ke element berdasarkan hash (#seven-tech, dll)
    useHashScroll(location.hash);

    return (
        <section className="bg-white py-14 lg:py-20" aria-labelledby="bisnis-unit-title">
            <h2 id="bisnis-unit-title" className="sr-only">
                Lini Bisnis Seven INC
            </h2>

            <div className="space-y-18 lg:space-y-22">
                <BusinessList blocks={BUSINESS_BLOCKS} />
            </div>
        </section>
    );
}