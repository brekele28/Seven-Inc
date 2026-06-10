export default function HeroImage({ src, alt }) {
    return (
        <div className="lg:col-span-7">
            <div className="w-full max-w-150 lg:ml-auto">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover select-none"
                    draggable="false"
                />
            </div>
        </div>
    );
}