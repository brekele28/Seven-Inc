import { BriefcaseBusiness } from "lucide-react";

export default function EmptyState({
    title = "Data lowongan tidak ditemukan",
    description = "Coba ubah kata kunci pencarian atau filter yang sedang digunakan.",
}) {
    return (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/70 px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-neutral-700 shadow-sm">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-[15px] font-extrabold text-neutral-950">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-[12px] leading-6 text-neutral-500">
                {description}
            </p>
        </div>
    );
}