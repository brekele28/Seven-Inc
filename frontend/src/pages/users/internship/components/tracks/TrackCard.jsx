export default function TrackCard({ iconSrc, label }) {
    const lines = typeof label === "string" ? label.split("\n") : [];

    return (
        <div
            className={[
                "rounded-xl border border-neutral-200 bg-white",
                "shadow-[0_8px_18px_rgba(0,0,0,0.06)]",
                "px-3 py-4",
                "min-h-22 md:min-h-24",
                "flex flex-col items-center justify-center text-center",
            ].join(" ")}
        >
            <img
                src={iconSrc}
                alt={typeof label === "string" ? label.replace("\n", " ") : "Icon"}
                className="h-8 w-8 md:h-9 md:w-9 object-contain select-none"
                draggable="false"
            />

            <p className="mt-2 text-[10px] md:text-[11px] font-extrabold leading-[1.1] text-neutral-900 whitespace-pre-line">
                {lines.length ? lines.join("\n") : label}
            </p>
        </div>
    );
}