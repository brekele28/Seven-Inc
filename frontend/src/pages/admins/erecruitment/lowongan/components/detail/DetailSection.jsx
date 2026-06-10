export default function DetailSection({ section }) {
    if (!section) return null;

    return (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 px-4 py-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.24em] text-neutral-900">
                {section.title}
            </h3>

            <ul className="mt-3 space-y-2 pl-4 text-[12px] leading-6 text-neutral-600">
                {section.items.map((item, index) => (
                    <li key={`${section.id}-${index}`} className="list-disc">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}