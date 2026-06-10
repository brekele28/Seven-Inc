import { ArchiveX } from "lucide-react";

export default function EmptyState({
    title = "Data arsip tidak ditemukan",
    description = "Coba ubah kata kunci pencarian, filter posisi, atau filter tahun.",
}) {
    return (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-500 shadow-sm">
                <ArchiveX className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-neutral-900">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-[12px] leading-relaxed text-neutral-500">
                {description}
            </p>
        </div>
    );
}