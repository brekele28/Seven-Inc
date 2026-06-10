export default function PrincipleCard({
    children,
}) {
    return (
        <div
            className="
                rounded-[28px]
                border border-neutral-200
                bg-gradient-to-br
                from-white
                via-white
                to-red-50/20
                p-5 sm:p-6
                shadow-sm
            "
        >
            {children}
        </div>
    );
}