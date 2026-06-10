import { Linkedin, Instagram, Facebook, X } from "lucide-react";
import SocialIcon from "./SocialIcon";

function getIcon(key) {
    if (key === "linkedin") return <Linkedin className="h-7 w-7" />;
    if (key === "instagram") return <Instagram className="h-7 w-7" />;
    if (key === "facebook") return <Facebook className="h-7 w-7" />;
    return <X className="h-7 w-7" />;
}

export default function SocialList({ title, socials }) {
    return (
        <div className="space-y-4">
            <h3 className="text-[22px] font-extrabold text-white">{title}</h3>

            <div className="flex items-center gap-4">
                {(socials || []).map((s) => (
                    <SocialIcon key={s.key} label={s.label} href={s.href}>
                        {getIcon(s.key)}
                    </SocialIcon>
                ))}
            </div>
        </div>
    );
}