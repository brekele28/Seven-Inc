import { MapPin, Phone, Mail } from "lucide-react";
import { kontakDummy } from "../../../../../services/user/kontak/data/kontak.dummy";

import InfoRow from "./InfoRow";
import SocialList from "./SocialList";

const RED = "#E63946";

export default function InfoBox() {
    const { office, cs, email, socialTitle, socials } = kontakDummy;

    return (
        <aside
            className={[
                "relative",
                "p-6 sm:p-8 md:p-10",
                "text-white",
                "md:rounded-r-[26px]",
                "bg-[var(--contact-red)]",
                // lekukan halus yang masuk ke area putih (desktop)
                "md:before:content-[''] md:before:absolute md:before:top-0 md:before:left-0",
                "md:before:h-full md:before:w-[72px]",
                "md:before:bg-white md:before:rounded-r-[999px]",
                "md:before:translate-x-[-36px]",
            ].join(" ")}
            style={{ ["--contact-red"]: RED }}
        >
            <div className="pl-8 space-y-10">
                <InfoRow icon={MapPin} title={office.title}>
                    <p>{office.address}</p>
                </InfoRow>

                <InfoRow icon={Phone} title={cs.title}>
                    <p className="font-semibold">{cs.phone}</p>
                </InfoRow>

                <InfoRow icon={Mail} title={email.title}>
                    <p className="font-semibold">{email.value}</p>
                </InfoRow>

                <SocialList title={socialTitle} socials={socials} />
            </div>
        </aside>
    );
}