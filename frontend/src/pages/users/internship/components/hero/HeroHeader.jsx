export default function HeroHeader({ eyebrow, title }) {
    const lines = typeof title === "string" ? title.split("\n") : [];

    return (
        <div className="lg:col-span-5">
            <p className="text-[14px] font-semibold tracking-[0.55em] text-neutral-500 uppercase">
                {eyebrow}
            </p>

            <h1
                id="internship-hero-title"
                className="mt-5 text-[30px] leading-[1.12] font-extrabold text-neutral-900 md:text-[34px] md:leading-[1.08] lg:text-[40px] lg:leading-[1.05]"
            >
                {lines.length > 0
                    ? lines.map((t, idx) => (
                        <span key={`${t}-${idx}`}>
                            {t}
                            {idx < lines.length - 1 ? <br /> : null}
                        </span>
                    ))
                    : title}
            </h1>
        </div>
    );
}