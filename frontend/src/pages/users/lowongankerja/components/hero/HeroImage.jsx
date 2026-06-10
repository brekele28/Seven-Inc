export default function HeroImage({ src, alt = "" }) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-full max-w-190 lg:ml-auto object-cover"
            draggable="false"
        />
    );
}