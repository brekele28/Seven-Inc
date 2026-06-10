import SectionCard from "../../../../../../components/admin/tampilan/cards/SectionCard";
import SectionHeader from "../../../../../../components/admin/tampilan/layouts/SectionHeader";

import InputField from "../../../../../../components/admin/tampilan/fields/InputField";
import TextareaField from "../../../../../../components/admin/tampilan/fields/TextareaField";

export default function Career({
    form,
    updateField,
    isEditing,
}) {
    return (
        <SectionCard>
            <SectionHeader
                badge="Posisi Pekerjaan"
                title="Section Pertumbuhan Karir"
                description="Kelola teks utama section posisi pekerjaan agar landing page terlihat lebih menarik dan modern."
            />

            <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-7">
                <InputField
                    label="Section Label"
                    value={form.careerBadge}
                    disabled={!isEditing}
                    placeholder="POSISI PEKERJAAN"
                    onChange={(e) =>
                        updateField("careerBadge", e.target.value)
                    }
                />

                <TextareaField
                    label="Headline"
                    rows={3}
                    disabled={!isEditing}
                    value={form.careerTitle}
                    placeholder="Mulai pertumbuhan karirmu sekarang."
                    onChange={(e) =>
                        updateField("careerTitle", e.target.value)
                    }
                />
            </div>
        </SectionCard>
    );
}