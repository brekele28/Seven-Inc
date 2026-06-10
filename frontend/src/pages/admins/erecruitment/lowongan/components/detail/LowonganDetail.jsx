import EmptyState from "../../../../../../components/admin/lowongan/table/EmptyState";
import DetailHeader from "./DetailHeader";
import DetailInfo from "./DetailInfo";
import DetailSection from "./DetailSection";

export default function LowonganDetail({
    item,
    onEdit,
    onClose,
    onDelete,
    onPublish,
}) {
    if (!item) {
        return (
            <div className="rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
                <EmptyState
                    title="Belum ada detail lowongan"
                    description="Pilih salah satu lowongan untuk melihat detail kualifikasi dan informasi lainnya."
                />
            </div>
        );
    }

    return (
        <aside className="overflow-hidden rounded-[26px] border border-neutral-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] xl:sticky xl:top-24 xl:self-start">
            <DetailHeader
                item={item}
                onEdit={onEdit}
                onClose={onClose}
                onDelete={onDelete}
                onPublish={onPublish}
            />

            <DetailInfo item={item} />

            <div className="border-t border-neutral-100 px-5 py-5">
                <p className="text-[13px] font-black text-neutral-950">
                    Deskripsi Lowongan
                </p>
                <p className="mt-2 text-[12px] leading-6 text-neutral-600">
                    {item.intro}
                </p>
            </div>

            <div className="space-y-3 border-t border-neutral-100 p-5">
                <p className="text-[13px] font-black text-neutral-950">
                    Detail Kualifikasi
                </p>

                {item.sections.map((section) => (
                    <DetailSection key={section.id} section={section} />
                ))}
            </div>
        </aside>
    );
}