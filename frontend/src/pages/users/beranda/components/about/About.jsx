import { useLocation, useNavigate } from "react-router";
import Loader from "../../../../../components/user/ui/Loader/loader";
import useDelayedNavigate from "../../../../../hooks/user/navbar/useDelayedNavigate";

import AboutBody from "./AboutBody";
import AboutImage from "./AboutImage";

export default function About() {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ pakai hook global (hemat, tidak duplikasi)
    const nav = useDelayedNavigate({
        navigate,
        currentPath: location.pathname,
        delayMs: 1500,
        scrollBehavior: "auto",
    });

    return (
        <>
            {nav.isLoading && <Loader />}

            <section className="bg-white py-16 md:py-20">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    <AboutBody onReadMore={() => nav.delayedNavigate("/tentang-kami")} />
                    <AboutImage />
                </div>
            </section>
        </>
    );
}