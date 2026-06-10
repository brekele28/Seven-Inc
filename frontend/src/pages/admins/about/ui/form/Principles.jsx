import AboutSectionCard from "../../../../../components/admin/about/cards/AboutSectionCard";
import PrincipleCard from "../principle/PrincipleCard";

export default function Principles({
    principles,
    isEditing,

    addPrincipleDescription,
    updatePrincipleDescription,
    deletePrincipleDescription,

    updatePrincipleTitle,

    openEditPrincipleImage,
    openDeletePrincipleImage,
}) {
    return (
        <AboutSectionCard>
            <div className="rounded-t-[32px] border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-5 py-5 sm:px-7">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                    Core Value Slides
                </p>

                <h2 className="mt-2 text-[24px] font-black text-neutral-950 sm:text-[30px]">
                    Kelola Core Value Slides
                </h2>

                <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
                    Kelola icon, judul, dan seluruh isi slider Integritas serta
                    Positive Vibe yang tampil pada halaman About.
                </p>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-2">
                {principles.map((principle) => (
                    <PrincipleCard
                        key={principle.id}
                        principle={principle}
                        isEditing={isEditing}
                        addDescription={addPrincipleDescription}
                        updateDescription={updatePrincipleDescription}
                        deleteDescription={deletePrincipleDescription}
                        updateTitle={updatePrincipleTitle}
                        openEditImage={openEditPrincipleImage}
                        openDeleteImage={openDeletePrincipleImage}
                    />
                ))}
            </div>
        </AboutSectionCard>
    );
}