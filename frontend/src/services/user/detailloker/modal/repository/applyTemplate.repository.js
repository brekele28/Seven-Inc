import { APPLY_TEMPLATES } from "../data/applyTemplate.dummy";

export function getApplyTemplate(templateKey = "DEFAULT_APPLY") {
    const key = String(templateKey || "DEFAULT_APPLY");
    return APPLY_TEMPLATES[key] || APPLY_TEMPLATES.DEFAULT_APPLY;
}