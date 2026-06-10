import BannerText from "./BannerText";
import BannerButton from "./BannerButton";
import useBannerCta from "../../../../../features/banner/useBannerCta";

export default function BannerContent() {
    const { handleRegisterClick } = useBannerCta();

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-60 md:min-h-80">
            <div
                className="
          col-span-1 md:col-span-8
          px-5 py-8 md:px-26 md:py-14
          flex flex-col justify-center
          z-20
          max-w-[60%] md:max-w-full
        "
            >
                <BannerText />
                <BannerButton onClick={handleRegisterClick} />
            </div>

            <div className="col-span-1 md:col-span-4 relative">{/* spacer */}</div>
        </div>
    );
}