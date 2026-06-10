export default function NavItem({ label, isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full text-left",
                "px-4 py-3 rounded-xl",
                "border",
                "transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60",
                isActive
                    ? "border-red-200 bg-red-50 text-red-700 shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300",
            ].join(" ")}
        >
            <span className="text-[14px] font-semibold">{label}</span>
        </button>
    );
}