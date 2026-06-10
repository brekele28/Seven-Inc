export default function SecondaryButton({
    children,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={`h-12 rounded-2xl border border-neutral-200 bg-white px-5 text-[13px] font-bold text-neutral-700 transition duration-300 hover:bg-neutral-100 cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}