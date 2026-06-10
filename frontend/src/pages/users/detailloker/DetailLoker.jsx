import DetailBackLink from "./components/header/BackLink";
import DetailHeader from "./components/header/Header";
import DetailMetaBar from "./components/header/MetaBar";
import DetailIntro from "./components/header/Intro";

import SectionList from "./components/content/SectionList";
import Note from "./components/content/Note";
import ApplyButton from "./components/content/ApplyButton";

import ApplyModal from "./modal/ApplyModal";
import ApplySuccessDialog from "./feedback/ApplySuccessDialog";

import useDetailLoker from "../../../hooks/user/detailloker/useDetailLoker";

function getJobId(data) {
    return String(
        data?.lowongan_id ||
        data?.jobId ||
        data?.id ||
        ""
    ).trim();
}

export default function DetailLoker() {
    const {
        data,
        isLoading,
        error,
        openApply,
        setOpenApply,
        successOpen,
        applicationId,
        setSuccessOpen,
        handleApply,
        handleApplySuccess,
        goCheckStatus,
    } = useDetailLoker();

    if (isLoading) {
        return (
            <section className="py-10">
                <DetailBackLink />
                <p className="mt-6 text-[13px] text-neutral-600">
                    Memuat detail lowongan...
                </p>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="py-10">
                <DetailBackLink />
                <p className="mt-6 text-[13px] text-neutral-600">
                    {error || "Data lowongan tidak ditemukan."}
                </p>
            </section>
        );
    }

    return (
        <>
            <section aria-labelledby="detail-loker-title">
                <DetailBackLink />
                <DetailHeader title={data.title} company={data.company} />
                <DetailMetaBar meta={data.meta} />
                <DetailIntro text={data.intro} />
                <SectionList sections={data.sections} />
                <Note text={data.note} />
                <ApplyButton text={data.ctaText} onClick={handleApply} />
            </section>

            <ApplyModal
                open={openApply}
                onClose={() => setOpenApply(false)}
                onSuccess={handleApplySuccess}
                jobId={getJobId(data)}
                jobTitle={data.title}
                templateKey="DEFAULT_APPLY"
            />

            <ApplySuccessDialog
                open={successOpen}
                applicationId={applicationId}
                jobTitle={data.title}
                onClose={() => setSuccessOpen(false)}
                onGoCheckStatus={goCheckStatus}
            />
        </>
    );
}