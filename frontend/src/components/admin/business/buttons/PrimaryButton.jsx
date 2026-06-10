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
                h-12
                rounded-2xl
                bg-red-600
                px-5
                text-[13px] sm:text-[14px]
                font-bold
                text-white
                shadow-lg shadow-red-200
                transition duration-300
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