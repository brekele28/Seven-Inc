export default function HeroImage({ src, alt }) {
    return (
        <div className="lg:col-span-7 lg:justify-self-end">
            <div className="w-full max-w-156.25 shadow-[0_14px_34px_rgba(0,0,0,0.10)]">
                <img src={src} alt={alt} className="w-full h-auto" draggable="false" />
            </div>
        </div>
    );
}