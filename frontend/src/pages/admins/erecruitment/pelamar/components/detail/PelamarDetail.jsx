import DetailHeader from "./DetailHeader";
import ProfileInfo from "./ProfileInfo";
import JobInfo from "./JobInfo";
import DocumentCard from "./DocumentCard";
import RecruitmentTimeline from "./RecruitmentTimeline";
import ActionPanel from "../action/ActionPanel";

export default function PelamarDetail({
    applicant,
    open,
    actionLoading = false,
    onClose,
    onChangeStatus,
    onPreviewCv,
}) {
    if (!open || !applicant) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm">
            <button
                type="button"
                className="absolute inset-0 cursor-default"
                onClick={onClose}
                aria-label="Tutup detail"
            />

            <aside className="absolute right-0 top-0 flex h-full w-full max-w-4xl flex-col bg-neutral-50 shadow-2xl">
                <DetailHeader applicant={applicant} onClose={onClose} />

                <div className="flex-1 overflow-y-auto px-5 py-5">
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_0.9fr]">
                        <div className="space-y-5">
                            <ProfileInfo applicant={applicant} />
                            <JobInfo applicant={applicant} />
                            <DocumentCard
                                applicant={applicant}
                                onPreviewCv={onPreviewCv}
                            />
                        </div>

                        <div className="space-y-5">
                            <RecruitmentTimeline timeline={applicant.timeline} />
                            <ActionPanel
                                applicant={applicant}
                                loading={actionLoading}
                                onChangeStatus={onChangeStatus}
                            />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}