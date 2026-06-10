import Section from "./Section";

export default function SectionList({ sections = [] }) {
    return (
        <>
            {Array.isArray(sections)
                ? sections.map((sec, idx) => (
                    <Section
                        key={sec?.id || `${sec?.title || "sec"}-${idx}`}
                        title={sec.title}
                        items={sec.items}
                    />
                ))
                : null}
        </>
    );
}