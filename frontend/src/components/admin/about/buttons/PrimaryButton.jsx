export default function PrimaryButton({
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
                px-5 sm:px-6
                rounded-2xl
                bg-red-600
                text-white
                text-[13px] sm:text-[14px]
                font-bold
                shadow-lg shadow-red-200/50
                transition-all duration-300
                hover:bg-red-700
                hover:-translate-y-[1px]
                cursor-pointer
                ${className}
            `}
        >
            {children}
        </button>
    );
}