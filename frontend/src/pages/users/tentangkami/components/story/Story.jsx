import StoryColumn from "./StoryColumn";

export default function Story({ left = [], right = [] }) {
    return (
        <section className="bg-white py-14 lg:py-18" aria-label="Tentang Seven INC">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 lg:gap-x-24">
                <StoryColumn paragraphs={left} />
                <StoryColumn paragraphs={right} />
            </div>
        </section>
    );
}