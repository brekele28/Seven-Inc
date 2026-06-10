import { BriefcaseBusiness, CalendarClock, MapPin, Users } from "lucide-react";

function formatDate(value) {
    if (!value) return "-";

    try {
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(value));
    } catch {
        return value;
    }
}

function InfoItem({ icon: Icon, label, value }) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                </div>

                <div>
                    <p className="text-[11px] font-semibold text-neutral-500">
                        {label}
                    </p>
                    <p className="mt-1 text-[12px] font-extrabold leading-5 text-neutral-950">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function DetailInfo({ item }) {
    if (!item) return null;

    return (
        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
            <InfoItem
                icon={BriefcaseBusiness}
                label="Posisi"
                value={item.title}
            />
            <InfoItem
                icon={Users}
                label="Jumlah Pelamar"
                value={`${item.applicantCount} pelamar`}
            />
            <InfoItem
                icon={MapPin}
                label="Lokasi"
                value={item.location}
            />
            <InfoItem
                icon={CalendarClock}
                label="Masa Lowongan"
                value={`${formatDate(item.openedAt)} - ${formatDate(item.closedAt)}`}
            />
        </div>
    );
}