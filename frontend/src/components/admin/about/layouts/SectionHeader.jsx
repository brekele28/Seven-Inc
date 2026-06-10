export default function SectionHeader({
    icon,
    badge,
    title,
    description,
}) {
    const Icon = icon;

    return (
        <div className="relative border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-6 sm:px-7">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-red-100/30 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-red-100 bg-white shadow-sm">
                    <Icon className="h-8 w-8 text-red-500" />
                </div>

                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
                        {badge}
                    </p>

                    <h2 className="mt-3 text-[24px] font-black leading-tight text-neutral-950 sm:text-[34px]">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}