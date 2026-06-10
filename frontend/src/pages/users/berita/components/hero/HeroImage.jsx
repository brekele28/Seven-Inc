export default function HeroImage() {
    return (
        <>
            <img
                src="/assets/image/Berita/news.png"
                alt="Hero Berita Seven INC"
                className="absolute inset-0 h-full w-full object-cover"
                draggable="false"
            />

            {/* light overlay (tint) */}
            <div className="absolute inset-0 bg-white/60" />
        </>
    );
}