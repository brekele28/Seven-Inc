import StoryParagraph from "./StoryParagraph";

export default function StoryColumn({ paragraphs = [] }) {
    return (
        <div className="space-y-8 text-[14px] leading-[2.05] text-neutral-700">
            {Array.isArray(paragraphs)
                ? paragraphs.map((text) => <StoryParagraph key={text} text={text} />)
                : null}
        </div>
    );
}