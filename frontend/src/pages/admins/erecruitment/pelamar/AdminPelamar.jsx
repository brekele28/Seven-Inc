import { useState } from "react";

import usePelamar from "../../../../hooks/admin/pelamar/usePelamar";

import CvPreviewModal from "../../../../components/admin/cv-preview/CvPreviewModal";

import PelamarHeader from "./components/header/PelamarHeader";
import PelamarFilter from "./components/filter/PelamarFilter";
import PelamarTable from "./components/table/PelamarTable";
import PelamarDetail from "./components/detail/PelamarDetail";

const EMPTY_CV_PREVIEW = {
    open: false,
    title: "",
    fileName: "",
    fileUrl: "",
};

export default function AdminPelamar() {
    const {
        filteredApplicants,
        selectedApplicant,

        search,
        setSearch,
        status,
        setStatus,
        position,
        setPosition,

        statusOptions,
        positionOptions,
        canDeleteRows,

        isLoading,
        isActionLoading,
        error,
        reload,

        openDetail,
        closeDetail,
        handleStatusChange,
        handleDeleteApplicant,
        resetFilter,
    } = usePelamar();

    const [cvPreview, setCvPreview] = useState(EMPTY_CV_PREVIEW);

    const handlePreviewCv = (payload) => {
        closeDetail();

        window.setTimeout(() => {
            setCvPreview({
                open: true,
                title: payload?.title || "Preview CV Pelamar",
                fileName: payload?.fileName || "CV Pelamar.pdf",
                fileUrl: payload?.fileUrl || "",
            });
        }, 120);
    };

    const closeCvPreview = () => {
        setCvPreview(EMPTY_CV_PREVIEW);
    };

    return (
        <div className="space-y-6">
            <PelamarHeader />

            <PelamarFilter
                search={search}
                onSearchChange={setSearch}
                position={position}
                onPositionChange={setPosition}
                status={status}
                onStatusChange={setStatus}
                positionOptions={positionOptions}
                statusOptions={statusOptions}
                onReset={resetFilter}
            />

            {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
                    <p className="text-[12px] font-extrabold text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={reload}
                        className="mt-3 cursor-pointer rounded-full bg-red-600 px-4 py-2 text-[12px] font-bold text-white hover:bg-red-700"
                    >
                        Muat Ulang
                    </button>
                </div>
            ) : null}

            {isLoading ? (
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-8 text-center">
                    <p className="text-[13px] font-semibold text-neutral-500">
                        Memuat data pelamar...
                    </p>
                </div>
            ) : (
                <PelamarTable
                    applicants={filteredApplicants}
                    onDetail={openDetail}
                    canDeleteRows={canDeleteRows}
                    onDelete={handleDeleteApplicant}
                />
            )}

            <PelamarDetail
                open={Boolean(selectedApplicant)}
                applicant={selectedApplicant}
                actionLoading={isActionLoading}
                onClose={closeDetail}
                onChangeStatus={handleStatusChange}
                onPreviewCv={handlePreviewCv}
            />

            <CvPreviewModal
                open={cvPreview.open}
                title={cvPreview.title}
                fileName={cvPreview.fileName}
                fileUrl={cvPreview.fileUrl}
                onClose={closeCvPreview}
            />
        </div>
    );
}