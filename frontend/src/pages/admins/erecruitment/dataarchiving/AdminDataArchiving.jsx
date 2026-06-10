import { useState } from "react";

import useArchiving from "../../../../hooks/admin/archiving/useArchiving";

import CvPreviewModal from "../../../../components/admin/cv-preview/CvPreviewModal";

import ArchivingHeader from "./components/header/ArchivingHeader";
import ArchivingFilter from "./components/filter/ArchivingFilter";
import ArchivingTable from "./components/table/ArchivingTable";
import ArchivingDetail from "./components/detail/ArchivingDetail";
import ReportPreview from "./components/report/ReportPreview";

const EMPTY_CV_PREVIEW = {
    open: false,
    title: "",
    fileName: "",
    fileUrl: "",
};

export default function AdminDataArchiving() {

    const {
        archives,
        filteredArchives,
        selectedArchive,

        search,
        setSearch,
        position,
        setPosition,
        year,
        setYear,

        positionOptions,
        yearOptions,

        isLoading,
        error,
        reload,

        reportOpen,
        reportMeta,
        openReport,
        closeReport,

        openDetail,
        closeDetail,
        resetFilter,
    } = useArchiving();

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

    const handleArchiveFromReport = async (applicationId) => {
        const archive = archives.find(
            (item) => item.applicationId === applicationId
        );

        if (!archive) return;

        closeReport();

        window.setTimeout(() => {
            openDetail(archive);
        }, 150);
    };

    return (
        <div className="space-y-6">
            <ArchivingHeader onExport={openReport} />

            <ArchivingFilter
                search={search}
                onSearchChange={setSearch}
                position={position}
                onPositionChange={setPosition}
                year={year}
                onYearChange={setYear}
                positionOptions={positionOptions}
                yearOptions={yearOptions}
                onReset={resetFilter}
            />

            {error ? (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
                    <p className="text-[13px] font-bold text-red-700">
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
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-8 text-center text-[13px] font-semibold text-neutral-600">
                    Memuat data archiving...
                </div>
            ) : (
                <ArchivingTable
                    archives={filteredArchives}
                    onDetail={openDetail}
                />
            )}

            <ArchivingDetail
                open={Boolean(selectedArchive)}
                archive={selectedArchive}
                onClose={closeDetail}
                onPreviewCv={handlePreviewCv}
            />

            <ReportPreview
                open={reportOpen}
                onClose={closeReport}
                archives={filteredArchives}
                meta={reportMeta}
                onOpenArchive={handleArchiveFromReport}
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