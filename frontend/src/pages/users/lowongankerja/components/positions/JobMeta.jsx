import { Briefcase, Clock, MapPin } from "lucide-react";

function MetaItem({ icon, text }) {
    const IconComp = icon;
    return (
        <div className="flex items-center gap-2 text-[12px] text-neutral-600">
            <IconComp className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
            <span className="leading-relaxed">{text}</span>
        </div>
    );
}

export default function JobMeta({ meta }) {
    const items = [
        { icon: Briefcase, text: meta.position },
        { icon: MapPin, text: meta.location },
        { icon: Clock, text: meta.closeDate },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 px-6 py-4 md:grid-cols-3 md:px-8">
            {items.map((item, idx) => (
                <MetaItem key={idx} icon={item.icon} text={item.text} />
            ))}
        </div>
    );
}