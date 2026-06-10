export default function ArticleRelatedLink({
    label = "Baca juga:",
    text,
    href,
}) {
    return (
        <p className="mt-6 text-[13px] md:text-[14px] leading-[2.05] text-neutral-700">
            <span className="text-neutral-900">{label} </span>
            <a
                href={href}
                className="font-semibold italic text-neutral-900 transition hover:underline underline-offset-4"
            >
                {text}
            </a>
        </p>
    );
}