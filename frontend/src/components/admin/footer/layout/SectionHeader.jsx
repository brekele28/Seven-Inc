export default function SectionHeader({
    badge,
    title,
    description,
    action,
}) {
    return (
        <div className="flex flex-col gap-5 border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                    {badge}
                </p>

                <h2 className="mt-2 text-[24px] font-black text-neutral-950 sm:text-[32px]">
                    {title}
                </h2>

                <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500">
                    {description}
                </p>
            </div>

            {action}
        </div>
    );
}