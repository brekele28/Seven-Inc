import SectionCard from "../../../../../components/admin/dashboard/section/SectionCard";
import PriorityItem from "./PriorityItem";

export default function PriorityList({ items = [] }) {
    return (
        <SectionCard
            title="Prioritas Hari Ini"
            subtitle="Daftar tindakan penting yang perlu segera diproses HRD."
        >
            <div className="space-y-3">
                {items.map((item) => (
                    <PriorityItem key={item.id} item={item} />
                ))}
            </div>
        </SectionCard>
    );
}