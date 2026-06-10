import {
    HERO_SECTION,
    COMPANY_DESCRIPTION,
    CORE_VALUE_CONTENT,
    PRINCIPLES,
} from "../data/aboutData";

export function getHeroSection() {
    return structuredClone(HERO_SECTION);
}

export function getCompanyDescription() {
    return structuredClone(COMPANY_DESCRIPTION);
}

export function getCoreValueContent() {
    return structuredClone(CORE_VALUE_CONTENT);
}

export function getPrinciples() {
    return structuredClone(PRINCIPLES);
}