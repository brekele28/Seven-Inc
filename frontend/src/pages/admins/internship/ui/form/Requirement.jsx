import InternshipSectionCard from "../../../../../components/admin/internship/cards/InternshipSectionCard";
import PointField from "../../../../../components/admin/internship/fields/PointField";
import SectionHeader from "../../../../../components/admin/internship/layout/SectionHeader";
import PrimaryButton from "../../../../../components/admin/internship/buttons/PrimaryButton";

export default function Requirement({
    requirements,
    addRequirement,
    openDeleteModal,
}) {
    return (
        <InternshipSectionCard>
            <div className="px-8 py-8">
                <SectionHeader
                    badge="Requirements"
                    title="Syarat & Ketentuan"
                    action={
                        <PrimaryButton onClick={addRequirement}>
                            + Tambah
                        </PrimaryButton>
                    }
                />

                <div className="mt-8 space-y-4">
                    {requirements.map((item, index) => (
                        <PointField
                            key={index}
                            value={item}
                            onDelete={() =>
                                openDeleteModal({
                                    type: "requirement",
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