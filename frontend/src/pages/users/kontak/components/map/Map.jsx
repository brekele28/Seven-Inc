import { kontakDummy } from "../../../../../services/user/kontak/data/kontak.dummy";

export default function Map({ className = "" }) {
    return (
        <section
            className={[
                // breakout dari Container layout (UserLayout)
                "relative left-1/2 right-1/2 -mx-[50vw] w-screen",
                className,
            ].join(" ")}
            aria-label="Peta lokasi"
        >
            <div className="h-[360px] w-full bg-neutral-100">
                <iframe
                    title="Peta Seven Inc"
                    src={kontakDummy.map.embedUrl}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
}