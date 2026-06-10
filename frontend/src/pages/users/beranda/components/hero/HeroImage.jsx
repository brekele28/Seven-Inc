export default function HeroImage() {
    return (
        <>
            <img
                src="/assets/image/Beranda/Hero.png"
                alt="Hero Seven Inc"
                className="absolute inset-0 h-full w-full object-cover"
                draggable="false"
            />

            {/* overlay supaya teks jelas */}
            <div className="absolute inset-0 bg-black/35" />
        </>
    );
}