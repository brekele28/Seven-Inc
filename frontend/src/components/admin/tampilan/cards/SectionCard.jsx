export default function SectionCard({
    children,
}) {
    return (
        <section className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
            {children}
        </section>
    );
}