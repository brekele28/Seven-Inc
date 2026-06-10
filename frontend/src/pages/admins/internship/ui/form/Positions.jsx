import InternshipSectionCard from "../../../../../components/admin/internship/cards/InternshipSectionCard";
import InternshipPositionCard from "../../../../../components/admin/internship/cards/InternshipPositionCard";

import SectionHeader from "../../../../../components/admin/internship/layout/SectionHeader";

import PrimaryButton from "../../../../../components/admin/internship/buttons/PrimaryButton";

export default function Positions({
    positions,
    addPosition,
    openDeleteModal,
}) {
    return (
        <InternshipSectionCard>
            <div className="px-8 py-8">
                <SectionHeader
                    badge="Internship Positions"
                    title="Formasi Internship"
                    description="Kelola posisi internship dengan tampilan card premium modern."
                    action={
                        <PrimaryButton onClick={addPosition}>
                            + Tambah Card
                        </PrimaryButton>
                    }
                />

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {positions.map((item) => (
                        <InternshipPositionCard
                            key={item.id}
                            title={item.title}
                            onDelete={() =>
                                openDeleteModal({
                                    type: "position",
                                    id: item.id,
                                })
                            }
                        />
                    ))}
                </div>
            </div>
        </InternshipSectionCard>
    );
}