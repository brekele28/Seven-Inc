import { Briefcase, Clock, MapPin } from "lucide-react";

function MetaItem({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
            <span className="text-[12px] text-neutral-600 leading-relaxed">{text}</span>
        </div>
    );
}

export default function MetaBar({ meta }) {
    const items = [
        { icon: Briefcase, text: meta.position },
        { icon: MapPin, text: meta.location },
        { icon: Clock, text: meta.closeDate },
    ];

    return (
        <div className="mt-4 border-y border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3">
                {items.map((item, idx) => (
                    <MetaItem key={idx} icon={item.icon} text={item.text} />
                ))}
            </div>
        </div>
    );
}