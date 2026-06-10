import BusinessText from "./BusinessText";
import BusinessImage from "./BusinessImage";

export default function BusinessBlock({ title, paragraphs, imageSrc, reverse }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-y-8 lg:gap-y-0 lg:gap-x-14">
            <BusinessText title={title} paragraphs={paragraphs} reverse={reverse} />
            <BusinessImage title={title} imageSrc={imageSrc} reverse={reverse} />
        </div>
    );
}