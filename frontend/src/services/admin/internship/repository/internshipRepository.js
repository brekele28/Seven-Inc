import internshipData from "../data/internshipData";

const internshipRepository = {
    getRequirements() {
        return internshipData.requirements;
    },

    getBenefits() {
        return internshipData.benefits;
    },

    getPositions() {
        return internshipData.positions;
    },
};

export default internshipRepository;