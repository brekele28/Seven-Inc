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
            className={[
                "cursor-pointer rounded-2xl bg-red-600 px-6 py-3",
                "text-[13px] font-bold text-white",
                "transition duration-300 hover:bg-red-700",
                "shadow-[0_12px_30px_rgba(239,68,68,0.25)]",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}