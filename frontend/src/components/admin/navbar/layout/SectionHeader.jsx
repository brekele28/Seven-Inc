export default function SectionHeader({
    badge,
    title,
    description,
}) {
    return (
        <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-6 sm:px-8">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                {badge}
            </p>

            <h2 className="mt-3 text-[30px] font-black leading-tight text-neutral-950 sm:text-[38px]">
                {title}
            </h2>

            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                {description}
            </p>
        </div>
    );
}