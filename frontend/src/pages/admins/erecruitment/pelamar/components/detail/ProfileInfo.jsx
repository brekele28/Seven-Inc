import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-700">
                <Icon className="h-4 w-4" aria-hidden="true" />
            </div>

            <div>
                <p className="text-[11px] font-semibold text-neutral-500">
                    {label}
                </p>
                <p className="mt-1 text-[12px] font-bold leading-relaxed text-neutral-900">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}

export default function ProfileInfo({ applicant }) {
    return (
        <section>
            <h3 className="text-[13px] font-extrabold text-neutral-900">
                Informasi Pelamar
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3">
                <InfoRow icon={User} label="Nama Lengkap" value={applicant.fullName} />
                <InfoRow icon={Mail} label="Email" value={applicant.email} />
                <InfoRow icon={Phone} label="No. WhatsApp" value={applicant.phone} />
                <InfoRow icon={Calendar} label="TTL" value={`${applicant.birthPlace}, ${applicant.birthDate}`} />
                <InfoRow icon={MapPin} label="Alamat" value={applicant.address} />
            </div>
        </section>
    );
}