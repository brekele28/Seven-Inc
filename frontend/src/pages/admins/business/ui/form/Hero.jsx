import { BriefcaseBusiness } from "lucide-react";

import UploadField from "../../../../../components/admin/business/fields/UploadField";
import SectionHeader from "../../../../../components/admin/business/layouts/SectionHeader";

export default function Hero({
    hero,
    heroPreview,
    openEditHero,
    openDeleteHero,
}) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
            <SectionHeader
                icon={BriefcaseBusiness}
                badge="HERO BUSINESS"
                title="Bisnis Kami"
                description="Kelola hero section bisnis Seven INC. agar tampil modern, profesional, dan konsisten di halaman user."
            />

            <div className="grid gap-6 px-5 py-6 sm:px-8 xl:grid-cols-2">
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                            Badge Text
                        </label>

                        <input
                            type="text"
                            defaultValue={hero.badge}
                            className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] font-medium outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                            Heading
                        </label>

                        <textarea
                            rows={4}
                            defaultValue={hero.title}
                            className="w-full rounded-3xl border border-neutral-200 bg-white px-5 py-4 text-[15px] font-semibold leading-relaxed outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>
                </div>

                <UploadField
                    label="Upload Image"
                    image={heroPreview}
                    onEdit={openEditHero}
                    onDelete={openDeleteHero}
                />
            </div>
        </section>
    );
}