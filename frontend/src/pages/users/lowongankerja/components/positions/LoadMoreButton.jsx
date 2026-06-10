export default function LoadMoreButton({ onClick, disabled = false, label = "Lihat Lebih Banyak" }) {
    return (
        <div className="w-full flex justify-center py-6">
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={[
                    "min-w-65 rounded-full border border-neutral-200 bg-white",
                    "px-10 py-3 text-[13px] font-medium text-neutral-700",
                    "shadow-[0_10px_26px_rgba(0,0,0,0.06)]",
                    "transition active:scale-95 cursor-pointer",
                    disabled
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-neutral-50 hover:text-neutral-900",
                ].join(" ")}
            >
                {label}
            </button>
        </div>
    );
}