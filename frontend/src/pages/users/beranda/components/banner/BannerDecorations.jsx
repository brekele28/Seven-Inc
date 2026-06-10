export default function BannerDecorations() {
    return (
        <>
            <img
                src="/assets/image/Beranda/Banners/Panah.png"
                alt=""
                className="
          hidden md:block
          absolute
          top-0 bottom-0 right-0
          h-full w-auto
          object-cover
          z-10
          pointer-events-none select-none
        "
            />

            <img
                src="/assets/image/Beranda/Banners/Sponsor.png"
                alt="Sponsor"
                className="
          md:hidden
          absolute
          bottom-0 left-48
          h-45 w-auto
          object-contain
          z-30
          pointer-events-none select-none
        "
            />

            <img
                src="/assets/image/Beranda/Banners/Sponsor.png"
                alt="Sponsor"
                className="
          hidden md:block
          absolute
          bottom-0
          right-4 lg:right-2
          h-[135%] w-auto
          object-contain
          z-30
          origin-bottom
          pointer-events-none select-none
        "
            />
        </>
    );
}