import FooterContactCard from "../../../../../components/admin/footer/cards/FooterContactCard";

import SectionCard from "../../../../../components/admin/footer/layout/SectionCard";
import SectionHeader from "../../../../../components/admin/footer/layout/SectionHeader";

export default function Contacts({
    items,
    openEdit,
    openDelete,
}) {
    return (
        <SectionCard>
            <SectionHeader
                badge="Contact Section"
                title="Hubungi CS Kami"
                description="Kelola nomor telepon dan email perusahaan."
            />

            <div className="grid gap-5 p-5 lg:grid-cols-2 sm:p-7">
                {items.map((item) => (
                    <FooterContactCard
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