import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function BackLink({ to = "/lowongan-kerja", text = "Back to List" }) {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const href = page ? `${to}?page=${page}` : to;

    return (
        <Link
            to={href}
            className="inline-flex items-center gap-3 text-[13px] text-neutral-500 hover:text-neutral-800 transition"
            aria-label={text}
        >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{text}</span>
        </Link>
    );
}