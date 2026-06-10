import { Building2 } from "lucide-react";

import UploadField from "../../../../../components/admin/about/fields/UploadField";
import SectionHeader from "../../../../../components/admin/about/layouts/SectionHeader";

export default function Hero({
    hero,
    heroPreview,

    isEditing,

    openEditHero,
    openDeleteHero,

    handleUploadHero,
}) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
            <SectionHeader
                icon={Building2}
                badge="ABOUT SECTION"
                title="Kelola Tentang Kami"
                description="Kelola hero section halaman About agar tampil profesional, modern, dan terpercaya."
            />

            <div className="grid gap-6 px-5 py-5 sm:px-7 sm:py-7 xl:grid-cols-2">
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Badge Label
                        </label>

                        <input
                            value={hero.badge}
                            readOnly={!isEditing}
                            className={`
                                h-12 w-full rounded-2xl border px-4 text-[14px]
                                outline-none transition
                                ${
                                    isEditing
                                        ? "border-neutral-200 bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                        : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-600"
                                }
                            `}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Heading
                        </label>

                        <textarea
                            rows={3}
                            value={hero.title}
                            readOnly={!isEditing}
                            className={`
                                w-full rounded-2xl border px-4 py-4 text-[14px]
                                outline-none transition
                                ${
                                    isEditing
                                        ? "border-neutral-200 bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                        : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-600"
                                }
                            `}
                        />
                    </div>
                </div>

                <UploadField
                    label="Image"
                    uploadTitle="Upload Image"
                    uploadDescription="Pilih gambar untuk ditampilkan."
                    image={heroPreview}
                    disabled={!isEditing}
                    onUpload={handleUploadHero}
                    onEdit={openEditHero}
                    onDelete={openDeleteHero}
                />
            </div>
        </section>
    );
}