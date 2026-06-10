import { ArrowRight } from "lucide-react";

export default function StatCard({
    title = "",
    value = 0,
    description = "",
    icon: Icon,
    tone = "neutral",
    actionLabel = "",
    onClick,
}) {
    const toneClass = {
        neutral: "bg-neutral-100 text-neutral-700",
        red: "bg-red-50 text-red-600",
        amber: "bg-amber-50 text-amber-600",
        blue: "bg-blue-50 text-blue-600",
        emerald: "bg-emerald-50 text-emerald-600",
        violet: "bg-violet-50 text-violet-600",
    };

    const isClickable = typeof onClick === "function";

    return (
        <article
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onClick={isClickable ? onClick : undefined}
            onKeyDown={(e) => {
                if (!isClickable) return;

                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
            className={[
                "group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm",
                "transition duration-200",
                isClickable
                    ? "cursor-pointer hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60"
                    : "hover:-translate-y-0.5 hover:shadow-md",
            ].join(" ")}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[12px] font-semibold text-neutral-500">
                        {title}
                    </p>

                    <h3 className="mt-3 text-3xl font-extrabold text-neutral-900">
                        {value}
                    </h3>

                    <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
                        {description}
                    </p>
                </div>

                {Icon ? (
                    <div
                        className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                            toneClass[tone] || toneClass.neutral,
                        ].join(" ")}
                    >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                ) : null}
            </div>

            {actionLabel ? (
                <div className="mt-4 flex items-center gap-2 text-[12px] font-extrabold text-neutral-700">
                    <span>{actionLabel}</span>
                    <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                    />
                </div>
            ) : null}
        </article>
    );
}