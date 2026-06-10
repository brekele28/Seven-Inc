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
            className={[
                "cursor-pointer rounded-2xl border border-neutral-200",
                "bg-white px-5 py-3 text-[13px] font-bold",
                "text-neutral-700 transition duration-300",
                "hover:bg-neutral-100",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    );
}