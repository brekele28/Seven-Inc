import FooterSocialCard from "../../../../../components/admin/footer/cards/FooterSocialCard";

import SectionCard from "../../../../../components/admin/footer/layout/SectionCard";
import SectionHeader from "../../../../../components/admin/footer/layout/SectionHeader";

export default function Socials({
    items,
    openEdit,
    openDelete,
}) {
    return (
        <SectionCard>
            <SectionHeader
                badge="Social Media"
                title="Social Media Footer"
                description="Kelola link sosial media perusahaan."
            />

            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                {items.map((item) => (
                    <FooterSocialCard
                        key={item.id}
                        item={item}
                        openEdit={openEdit}
                        openDelete={openDelete}
                    />
                ))}
            </div>
        </SectionCard>
    );
}