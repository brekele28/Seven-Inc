import InternshipSectionCard from "../../../../../components/admin/internship/cards/InternshipSectionCard";
import PointField from "../../../../../components/admin/internship/fields/PointField";
import SectionHeader from "../../../../../components/admin/internship/layout/SectionHeader";
import PrimaryButton from "../../../../../components/admin/internship/buttons/PrimaryButton";

export default function Benefits({
    benefits,
    addBenefit,
    openDeleteModal,
}) {
    return (
        <InternshipSectionCard>
            <div className="px-8 py-8">
                <SectionHeader
                    badge="Benefits"
                    title="Fasilitas Internship"
                    action={
                        <PrimaryButton onClick={addBenefit}>
                            + Tambah
                        </PrimaryButton>
                    }
                />

                <div className="mt-8 space-y-4">
                    {benefits.map((item, index) => (
                        <PointField
                            key={index}
                            value={item}
                            onDelete={() =>
                                openDeleteModal({
                                    type: "benefit",
                                    index,
                                })
                            }
                        />
                    ))}
                </div>
            </div>
        </InternshipSectionCard>
    );
}