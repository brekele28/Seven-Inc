export default function HeroTitle({ title }) {
    return (
        <h1
            id="loker-hero-title"
            className="mt-5 whitespace-pre-line text-[34px] md:text-[40px] lg:text-[44px] font-extrabold leading-[1.05] text-neutral-900"
        >
            {title}
        </h1>
    );
}