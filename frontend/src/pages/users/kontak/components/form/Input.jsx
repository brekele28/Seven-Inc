export default function Input({ error, className = "", ...props }) {
    return (
        <input
            {...props}
            className={[
                "mt-2 w-full rounded-[10px]",
                "border bg-white",
                "px-4 py-3 text-[13px]",
                "outline-none transition",
                error
                    ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                    : "border-neutral-200 focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100",
                "placeholder:text-neutral-400",
                className,
            ].join(" ")}
        />
    );
}