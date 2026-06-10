export default function ArticleSection({ heading, children, content }) {
    const paragraph = typeof content === "string" ? content : children;

    return (
        <section className="mt-8">
            <h2 className="text-[13px] md:text-[14px] font-extrabold text-neutral-900">
                {heading}
            </h2>

            <p className="mt-2 text-[13px] md:text-[14px] leading-[2.05] text-neutral-700">
                {paragraph}
            </p>
        </section>
    );
}