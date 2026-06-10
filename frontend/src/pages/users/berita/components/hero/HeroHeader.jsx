export default function HeroHeader() {
    return (
        <div className="relative z-10 h-full pt-6 flex items-center justify-center text-center">
            <div className="px-4">
                <p className="text-[12px] md:text-[14px] font-semibold tracking-[0.55em] text-neutral-800 uppercase">
                    List Berita
                </p>

                <h1
                    id="berita-hero-title"
                    className="mt-4 text-[34px] md:text-[44px] font-extrabold leading-[1.1] text-neutral-900"
                >
                    Beberapa berita terbaru kami
                </h1>
            </div>
        </div>
    );
}