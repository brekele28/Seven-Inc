export default function SectionCard({
    children,
}) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:shadow-lg hover:shadow-red-100/40">
            {children}
        </section>
    );
}