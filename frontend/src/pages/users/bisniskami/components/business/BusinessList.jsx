import BusinessBlock from "./BusinessBlock";

export default function BusinessList({ blocks = [] }) {
    return (
        <>
            {blocks.map((block) => (
                <div key={block.id} id={block.id} className="scroll-mt-28">
                    <BusinessBlock
                        title={block.title}
                        paragraphs={block.paragraphs}
                        imageSrc={block.imageSrc}
                        reverse={block.reverse}
                    />
                </div>
            ))}
        </>
    );
}