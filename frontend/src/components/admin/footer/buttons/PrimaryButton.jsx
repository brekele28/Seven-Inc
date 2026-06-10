export default function PrimaryButton({
    children,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={`h-12 rounded-2xl bg-red-600 px-6 text-[13px] font-bold text-white shadow-lg shadow-red-200 transition duration-300 hover:scale-[1.02] hover:bg-red-700 cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}