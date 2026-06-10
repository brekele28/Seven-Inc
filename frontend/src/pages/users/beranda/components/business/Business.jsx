import { useLocation, useNavigate } from "react-router";
import Loader from "../../../../../components/user/ui/Loader/loader";
import useDelayedNavigate from "../../../../../hooks/user/navbar/useDelayedNavigate";

import BusinessHeader from "./BusinessHeader";
import BusinessGrid from "./BusinessGrid";

import { BUSINESS_ITEMS } from "../../../../../services/user/beranda/businessDummy";

export default function Business() {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ currentPath dibuat full (pathname + hash) biar perilaku sama persis kayak kode lama
    const currentFull = `${location.pathname}${location.hash || ""}`;

    const nav = useDelayedNavigate({
        navigate,
        currentPath: currentFull,
        delayMs: 1500,
        scrollBehavior: "auto",
    });

    const goToBusiness = (targetId) => {
        nav.delayedNavigate(`/bisnis-kami#${targetId}`);
    };

    return (
        <>
            {nav.isLoading && <Loader />}

            <section className="bg-white py-14 md:py-10">
                <BusinessHeader />
                <BusinessGrid items={BUSINESS_ITEMS} onPick={goToBusiness} />
            </section>
        </>
    );
}