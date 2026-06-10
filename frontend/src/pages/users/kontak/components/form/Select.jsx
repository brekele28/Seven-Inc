export default function Select({ error, className = "", children, ...props }) {
    return (
        <div className="relative mt-2">
            <select
                {...props}
                className={[
                    "w-full appearance-none rounded-[10px]",
                    "border bg-white",
                    "px-4 py-3 pr-10 text-[13px]",
                    "outline-none transition",
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                        : "border-neutral-200 focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100",
                    className,
                ].join(" ")}
            >
                {children}
            </select>

            {/* chevron (pure css) */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-700"
                    />
                </svg>
            </span>
        </div>
    );
}