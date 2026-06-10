import FooterAddressCard from "../../../../../components/admin/footer/cards/FooterAddressCard";

import SectionCard from "../../../../../components/admin/footer/layout/SectionCard";
import SectionHeader from "../../../../../components/admin/footer/layout/SectionHeader";

export default function Address({
    items,
    openEdit,
    openDelete,
}) {
    return (
        <SectionCard>
            <SectionHeader
                badge="Office Address"
                title="Alamat Kantor"
                description="Kelola alamat kantor pusat perusahaan."
            />

            <div className="p-5 sm:p-7">
                {items.map((item) => (
                    <FooterAddressCard
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