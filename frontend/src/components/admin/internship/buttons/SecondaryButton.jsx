export default function SecondaryButton({
    children,
    type = "button",
    onClick,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                flex items-center justify-center gap-2
                rounded-2xl border border-neutral-200
                bg-white px-5 h-12
                text-[14px] font-bold text-neutral-700
                transition duration-300
                hover:bg-neutral-100
                cursor-pointer
                ${className}
            `}
        >
            {children}
        </button>
    );
}