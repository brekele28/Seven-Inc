export default function HeroHeader() {
    return (
        <div
            className="
        relative
        -mt-30
        w-screen
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
      "
        >
            <div className="relative h-80 md:h-95 w-full overflow-hidden">
                {/* Background image */}
                <img
                    src="/assets/image/Bisnis/HeroBisnis.png"
                    alt="Hero Lini Bisnis Seven INC"
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable="false"
                />

                {/* Light overlay to keep navbar + hero text readable */}
                <div className="absolute inset-0 bg-white/55" />

                {/* Content */}
                <div className="relative z-10 h-full pt-20 flex items-center justify-center text-center">
                    <div className="px-4">
                        <p className="text-[12px] md:text-[14px] font-semibold tracking-[0.55em] text-neutral-800 uppercase">
                            Lini Bisnis Kami
                        </p>

                        <h1
                            id="bisnis-hero-title"
                            className="mt-4 text-[34px] md:text-[44px] font-extrabold leading-[1.1] text-neutral-900"
                        >
                            Satu Visi, Banyak Solusi
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}