import FacilitiesHeader from "./FacilitiesHeader";
import FacilitiesList from "./FacilitiesList";

export default function Facilities({ eyebrow, title, items }) {
    return (
        <section aria-labelledby="internship-fac-title" className="bg-white py-10 md:py-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Left */}
                <FacilitiesHeader eyebrow={eyebrow} title={title} />

                {/* Right */}
                <FacilitiesList items={items} />
            </div>
        </section>
    );
}