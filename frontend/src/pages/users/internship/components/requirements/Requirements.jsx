import RequirementsHeader from "./RequirementsHeader";
import RequirementsList from "./RequirementsList";

export default function Requirements({ eyebrow, title, items }) {
    return (
        <section aria-labelledby="internship-req-title" className="bg-white py-10 md:py-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Left */}
                <RequirementsHeader eyebrow={eyebrow} title={title} />

                {/* Right */}
                <RequirementsList items={items} />
            </div>
        </section>
    );
}