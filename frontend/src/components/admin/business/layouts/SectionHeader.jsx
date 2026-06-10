export default function SectionHeader({
    icon,
    badge,
    title,
    description,
    action,
}) {
    const Icon = icon;

    return (
        <div className="border-b border-neutral-100 bg-gradient-to-br from-red-50 via-white to-white px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                    {Icon && (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm sm:h-16 sm:w-16">
                            <Icon className="h-7 w-7 text-red-600 sm:h-8 sm:w-8" />
                        </div>
                    )}

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.38em] text-red-600 sm:text-[11px]">
                            {badge}
                        </p>

                        <h2 className="mt-2 text-[26px] font-black leading-tight text-neutral-950 sm:text-[34px]">
                            {title}
                        </h2>

                        {description && (
                            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {action && (
                    <div className="shrink-0">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}