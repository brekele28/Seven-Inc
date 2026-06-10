export default function PositionsHeader({ eyebrow, title }) {
    return (
        <div className="text-center">
            <p className="text-[12px] md:text-[14px] font-semibold tracking-[0.45em] text-neutral-700 uppercase">
                {eyebrow}
            </p>

            <h2
                id="loker-positions-title"
                className="mt-4 text-[18px] md:text-[28px] font-extrabold text-neutral-900"
            >
                {title}
            </h2>
        </div>
    );
}