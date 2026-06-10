import useBusiness from "../../../hooks/admin/business/useBusiness";

import Hero from "./ui/form/Hero";
import Intro from "./ui/form/Intro";
import Units from "./ui/form/Units";
import Actions from "./ui/form/Actions";

import EditImageModal from "../../../components/admin/business/modal/EditImageModal";
import DeleteImageModal from "../../../components/admin/business/modal/DeleteImageModal";

export default function AdminBusiness() {
    const {
        // Hero
        hero,
        heroPreview,
        editHeroOpen,
        deleteHeroOpen,
        openEditHero,
        closeEditHero,
        openDeleteHero,
        closeDeleteHero,
        uploadHeroImage,
        deleteHeroImage,

        // Company Description
        companyDescription,
        setCompanyDescription,

        // Business Units
        businessUnits,
        addBusinessUnit,
        removeBusinessUnit,
        updateBusinessUnit,
        updateLayoutPosition,

        // Unit Image
        selectedUnitId,
        editUnitImageOpen,
        deleteUnitImageOpen,
        openEditUnitImage,
        closeEditUnitImage,
        openDeleteUnitImage,
        closeDeleteUnitImage,
        uploadUnitImage,
        deleteUnitImage,

        // Actions
        handleReset,
        handleSave,
    } = useBusiness();

    return (
        <>
            <div className="space-y-6">
                <Hero
                    hero={hero}
                    heroPreview={heroPreview}
                    openEditHero={openEditHero}
                    openDeleteHero={openDeleteHero}
                />

                <Intro
                    value={companyDescription}
                    onChange={setCompanyDescription}
                />

                <Units
                    businessUnits={businessUnits}
                    addUnit={addBusinessUnit}
                    removeUnit={removeBusinessUnit}
                    updateBusinessUnit={updateBusinessUnit}
                    updateLayoutPosition={updateLayoutPosition}
                    openEditUnitImage={openEditUnitImage}
                    openDeleteUnitImage={openDeleteUnitImage}
                />

                <Actions
                    onReset={handleReset}
                    onSave={handleSave}
                />
            </div>

            {/* Hero Image Modal */}
            <EditImageModal
                open={editHeroOpen}
                onClose={closeEditHero}
                onUpload={uploadHeroImage}
            />

            <DeleteImageModal
                open={deleteHeroOpen}
                onClose={closeDeleteHero}
                onConfirm={deleteHeroImage}
            />

            {/* Unit Image Modal */}
            <EditImageModal
                open={editUnitImageOpen}
                onClose={closeEditUnitImage}
                onUpload={uploadUnitImage}
            />

            <DeleteImageModal
                open={deleteUnitImageOpen}
                onClose={closeDeleteUnitImage}
                onConfirm={deleteUnitImage}
            />
        </>
    );
}