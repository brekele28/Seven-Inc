import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Loader from "../../../../../components/user/ui/Loader/loader";
import useDelayedNavigate from "../../../../../hooks/user/navbar/useDelayedNavigate";

export default function ArticleBackLink({ href, to, text = "Kembali ke Berita" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const target = to || href || "/berita?page=1";

    const nav = useDelayedNavigate({
        navigate,
        currentPath: `${location.pathname}${location.search || ""}`,
        delayMs: 1500,
        scrollBehavior: "auto",
    });

    return (
        <>
            {nav.isLoading && <Loader />}

            <a
                href={target}
                onClick={(e) => {
                    e.preventDefault();
                    nav.delayedNavigate(target);
                }}
                className="mt-14 inline-flex items-center gap-2 text-[13px] font-semibold text-red-500 transition-colors hover:text-red-600"
            >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                {text}
            </a>
        </>
    );
}