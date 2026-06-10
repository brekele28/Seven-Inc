export default function RequirementsHeader({ eyebrow, title }) {
    const titleLines = typeof title === "string" ? title.split("\n") : [];

    return (
        <div className="lg:col-span-6">
            <p className="text-[14px] font-semibold tracking-[0.55em] text-neutral-500 uppercase">
                {eyebrow}
            </p>

            <h2
                id="internship-req-title"
                className="mt-4 text-[30px] leading-[1.15] font-extrabold text-neutral-900 md:text-[40px]"
            >
                {titleLines.length > 0
                    ? titleLines.map((t, idx) => (
                        <span key={`${t}-${idx}`}>
                            {t}
                            {idx < titleLines.length - 1 ? <br /> : null}
                        </span>
                    ))
                    : title}
            </h2>
        </div>
    );
}