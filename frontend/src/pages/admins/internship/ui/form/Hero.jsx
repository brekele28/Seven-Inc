import { GraduationCap } from "lucide-react";

import UploadField from "../../../../../components/admin/internship/fields/UploadField";
import InputField from "../../../../../components/admin/internship/fields/InputField";
import TextareaField from "../../../../../components/admin/internship/fields/TextareaField";

import InternshipSectionCard from "../../../../../components/admin/internship/cards/InternshipSectionCard";

export default function Hero({
    heroPreview,
    onUploadHero,
    onEditImage,
    onDeleteImage,
}) {
    return (
        <InternshipSectionCard>
            <div className="border-b border-neutral-100 bg-gradient-to-r from-red-50 via-white to-white px-8 py-8">
                <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-red-100 bg-white shadow-sm">
                        <GraduationCap className="h-8 w-8 text-red-500" />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
                            Internship Section
                        </p>

                        <h2 className="mt-3 text-[40px] font-black leading-tight text-neutral-950">
                            Kelola Internship
                        </h2>

                        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-neutral-500">
                            Kelola tampilan internship modern dan profesional
                            untuk halaman user Seven INC.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 px-8 py-8 xl:grid-cols-2">
                <div className="space-y-6">
                    <InputField
                        label="Badge Label"
                        placeholder="INTERNSHIP"
                    />

                    <TextareaField
                        label="Heading"
                        placeholder="Temukan Kesempatan, Bangun Masa Depan."
                        rows={5}
                    />
                </div>

                <UploadField
                    imagePreview={heroPreview}
                    onUpload={onUploadHero}
                    onEdit={onEditImage}
                    onDelete={onDeleteImage}
                />
            </div>
        </InternshipSectionCard>
    );
}