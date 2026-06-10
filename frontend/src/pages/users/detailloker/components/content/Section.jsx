export default function Section({ title, items }) {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <section className="mt-10" aria-label={title}>
            <h2 className="text-[12px] font-extrabold tracking-[0.35em] text-neutral-900 uppercase">
                {title}
            </h2>

            <ul className="mt-4 space-y-2 pl-6 list-disc text-[13px] leading-[1.9] text-neutral-700">
                {safeItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        </section>
    );
}