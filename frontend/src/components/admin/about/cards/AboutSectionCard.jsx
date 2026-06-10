export default function AboutSectionCard({
    children,
}) {
    return (
        <section
            className="
                overflow-hidden
                rounded-[28px]
                sm:rounded-[34px]
                border border-neutral-200
                bg-white
                shadow-sm
                transition-all duration-300
                hover:shadow-xl
                hover:shadow-red-100/30
            "
        >
            {children}
        </section>
    );
}