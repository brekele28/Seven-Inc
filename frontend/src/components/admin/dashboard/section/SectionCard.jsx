export default function SectionCard({
    title = "",
    subtitle = "",
    action,
    children,
    className = "",
}) {
    return (
        <section
            className={[
                "rounded-2xl border border-neutral-200 bg-white shadow-sm",
                className,
            ].join(" ")}
        >
            <div className="flex flex-col gap-3 border-b border-neutral-100 px-5 py-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h3 className="text-base font-extrabold text-neutral-900">
                        {title}
                    </h3>

                    {subtitle ? (
                        <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                {action ? <div className="shrink-0">{action}</div> : null}
            </div>

            <div className="p-5">{children}</div>
        </section>
    );
}