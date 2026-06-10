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
                h-11 sm:h-12
                px-5
                rounded-2xl
                border border-neutral-200
                bg-white
                text-neutral-700
                text-[13px] sm:text-[14px]
                font-bold
                transition-all duration-300
                hover:bg-neutral-100
                cursor-pointer
                ${className}
            `}
        >
            {children}
        </button>
    );
}