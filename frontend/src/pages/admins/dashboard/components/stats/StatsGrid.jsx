import { useNavigate } from "react-router-dom";
import {
    BadgeCheck,
    CalendarClock,
    ClipboardCheck,
    FileText,
    Inbox,
    TimerReset,
} from "lucide-react";

import StatCard from "../../../../../components/admin/dashboard/card/StatCard";

const icons = {
    FileText,
    Inbox,
    ClipboardCheck,
    CalendarClock,
    BadgeCheck,
    TimerReset,
};

export default function StatsGrid({ stats = [] }) {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stats.map((item) => {
                const Icon = icons[item.icon] || FileText;

                return (
                    <StatCard
                        key={item.id}
                        title={item.title}
                        value={item.value}
                        description={item.description}
                        tone={item.tone}
                        icon={Icon}
                        actionLabel={item.actionLabel}
                        onClick={
                            item.to
                                ? () => {
                                      navigate(item.to);
                                  }
                                : undefined
                        }
                    />
                );
            })}
        </div>
    );
}