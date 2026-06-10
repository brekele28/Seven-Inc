export default function PrinsipCard({ title, iconSrc, description }) {
    return (
        <article className="rounded-[18px] border border-neutral-300 bg-white px-10 py-12 text-center min-h-[420px] flex flex-col items-center">
            <img src={iconSrc} alt={title} className="h-26 w-26 object-contain" draggable="false" />

            <h3 className="mt-6 text-[16px] font-extrabold text-neutral-900">{title}</h3>

            <p className="mt-6 text-[13px] leading-[2.05] text-neutral-700 max-w-[240px]">
                {description}
            </p>
        </article>
    );
}