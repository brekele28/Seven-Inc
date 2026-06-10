import SectionCard from "../../../../../components/admin/footer/layout/SectionCard";
import SectionHeader from "../../../../../components/admin/footer/layout/SectionHeader";
import UploadField from "../../../../../components/admin/footer/fields/UploadField";

export default function Hero() {
    return (
        <SectionCard>
            <SectionHeader
                badge="Footer Section"
                title="Logo Footer"
                description="Kelola logo footer perusahaan Seven INC."
            />

            <div className="p-5 sm:p-7">
                <UploadField />
            </div>
        </SectionCard>
    );
}