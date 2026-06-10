import { X } from "lucide-react";
import BasicInfoForm from "./BasicInfoForm";
import DetailSectionForm from "./DetailSectionForm";
import FormActions from "./FormActions";

export default function LowonganForm({
    open = false,
    mode = "create",
    values,
    error,
    onClose,
    onSubmit,
    onChangeField,
    onChangeSectionTitle,
    onChangeSectionItem,
    onAddSectionItem,
    onRemoveSectionItem,
    onAddSection,
    onRemoveSection,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[998] flex justify-end bg-black/40 backdrop-blur-sm">
            <div className="flex h-full w-full max-w-4xl flex-col bg-neutral-50 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 bg-white px-5 py-5 md:px-7">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-red-600">
                            Lowongan
                        </p>

                        <h2 className="mt-2 text-2xl font-black text-neutral-950">
                            {mode === "edit" ? "Edit Lowongan" : "Tambah Lowongan"}
                        </h2>

                        <p className="mt-1 max-w-2xl text-[12px] leading-6 text-neutral-500">
                            Kelola posisi, masa pendaftaran, dan detail kualifikasi yang
                            akan tampil di halaman user.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50"
                        aria-label="Tutup form"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7">
                    <div className="space-y-5">
                        <BasicInfoForm
                            values={values}
                            onChangeField={onChangeField}
                        />

                        <DetailSectionForm
                            sections={values.sections}
                            onChangeSectionTitle={onChangeSectionTitle}
                            onChangeSectionItem={onChangeSectionItem}
                            onAddSectionItem={onAddSectionItem}
                            onRemoveSectionItem={onRemoveSectionItem}
                            onAddSection={onAddSection}
                            onRemoveSection={onRemoveSection}
                        />
                    </div>
                </div>

                <FormActions
                    mode={mode}
                    error={error}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
}