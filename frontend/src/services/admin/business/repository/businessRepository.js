import {
    businessHeroData,
    companyDescriptionData,
    businessUnitsData,
} from "../data/businessData";

export const getBusinessHero = () => ({
    ...businessHeroData,
});

export const getCompanyDescription = () => ({
    ...companyDescriptionData,
});

export const getBusinessUnits = () =>
    businessUnitsData.map((item) => ({
        ...item,
    }));