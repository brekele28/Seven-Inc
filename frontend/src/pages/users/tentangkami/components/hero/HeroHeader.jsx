export default function HeroHeader({ eyebrow, title }) {
    return (
        <div className="lg:col-span-5">
            <p className="text-[16px] font-medium tracking-[0.55em] text-neutral-800 uppercase">
                {eyebrow}
            </p>

            <h2
                id="about-title"
                className="mt-5 max-w-[360px] lg:max-w-[455px] text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.12] text-neutral-900"
            >
                {title}
            </h2>
        </div>
    );
}