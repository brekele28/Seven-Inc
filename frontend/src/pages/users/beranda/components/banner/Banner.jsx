import BannerContent from "./BannerContent";
import BannerDecorations from "./BannerDecorations";

export default function Banner() {
    return (
        <section className="bg-white py-14 md:py-24">
            <div
                className="
          relative
          w-full
          rounded-4xl
          shadow-[0_14px_34px_rgba(0,0,0,0.12)]
          border border-neutral-100
          overflow-visible
          bg-[linear-gradient(90deg,#D62B25_60%,#ffffff_60%)]
          md:bg-[linear-gradient(90deg,#D62B25_67%,#ffffff_67%)]
        "
            >
                <BannerContent />
                <BannerDecorations />
            </div>
        </section>
    );
}