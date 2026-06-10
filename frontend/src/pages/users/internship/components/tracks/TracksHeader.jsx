export default function TracksHeader({ eyebrow, title, description }) {
    return (
        <div className="text-center max-w-267 mx-auto">
            <p className="text-[14px] font-semibold tracking-[0.55em] text-neutral-500 uppercase">
                {eyebrow}
            </p>

            <h2
                id="internship-tracks-title"
                className="mt-4 text-[16px] md:text-[18px] lg:text-[40px] font-extrabold leading-tight text-neutral-900"
            >
                {title}
            </h2>

            <p className="mt-4 text-[11px] md:text-[14px] leading-[1.85] text-neutral-600">
                {description}
            </p>
        </div>
    );
}