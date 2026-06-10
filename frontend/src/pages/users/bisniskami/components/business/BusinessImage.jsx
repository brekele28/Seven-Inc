export default function BusinessImage({ title, imageSrc, reverse }) {
    return (
        <div
            className={[
                "lg:col-span-5",
                reverse ? "lg:order-1" : "lg:order-2",
                reverse ? "lg:justify-self-start" : "lg:justify-self-end",
            ].join(" ")}
        >
            <img
                src={imageSrc}
                alt={`Ilustrasi ${title}`}
                className="w-full max-w-130 h-auto object-cover"
                draggable="false"
            />
        </div>
    );
}