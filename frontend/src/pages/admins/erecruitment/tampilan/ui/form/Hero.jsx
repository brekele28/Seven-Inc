import { MonitorCog } from "lucide-react";

import SectionCard from "../../../../../../components/admin/tampilan/cards/SectionCard";
import SectionHeader from "../../../../../../components/admin/tampilan/layouts/SectionHeader";

import InputField from "../../../../../../components/admin/tampilan/fields/InputField";
import TextareaField from "../../../../../../components/admin/tampilan/fields/TextareaField";
import UploadImage from "../../../../../../components/admin/tampilan/fields/UploadImage";

export default function Hero({
    form,
    updateField,

    isEditing,

    imagePreview,

    openEditImage,
    openDeleteImage,

    isEditImageOpen,
    closeEditImage,

    isDeleteImageOpen,
    closeDeleteImage,

    handleImageChange,
    handleDeleteImage,
}) {
    return (
        <SectionCard>
            <SectionHeader
                icon={MonitorCog}
                badge="Hero Section"
                title="Atur Tampilan Karir Seven INC."
                description="Kelola hero landing page E-Recruitment agar terlihat lebih premium, modern, dan profesional untuk calon pelamar."
            />

            <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-7">
                <InputField
                    label="Badge Text"
                    value={form.heroBadge}
                    disabled={!isEditing}
                    placeholder="LOWONGAN KERJA"
                    onChange={(e) =>
                        updateField("heroBadge", e.target.value)
                    }
                />

                <TextareaField
                    label="Heading"
                    rows={3}
                    disabled={!isEditing}
                    value={form.heroTitle}
                    placeholder="Berkarir bersama Seven INC."
                    onChange={(e) =>
                        updateField("heroTitle", e.target.value)
                    }
                />

                <TextareaField
                    label="Description"
                    rows={4}
                    disabled={!isEditing}
                    value={form.heroDescription}
                    placeholder="Temukan peluang karir Anda dengan posisi yang sesuai."
                    onChange={(e) =>
                        updateField("heroDescription", e.target.value)
                    }
                />

                <UploadImage
                    image={form.heroImage}
                    imagePreview={imagePreview}
                    isEditing={isEditing}
                    onEdit={openEditImage}
                    onDelete={openDeleteImage}
                    isEditOpen={isEditImageOpen}
                    isDeleteOpen={isDeleteImageOpen}
                    onCloseEdit={closeEditImage}
                    onCloseDelete={closeDeleteImage}
                    onImageChange={handleImageChange}
                    onConfirmDelete={handleDeleteImage}
                />
            </div>
        </SectionCard>
    );
}