export default function SectionHeader({
    badge,
    title,
    description,
    action,
}) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.38em] text-red-600">
                    {badge}
                </p>

                <h2 className="mt-3 text-[34px] font-black leading-tight text-neutral-950">
                    {title}
                </h2>

                {description && (
                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-neutral-500">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
}