import DetailHeader from "./DetailHeader";
import ProfileInfo from "./ProfileInfo";
import ArchiveInfo from "./ArchiveInfo";

export default function ArchivingDetail({
    archive,
    open,
    onClose,
    onPreviewCv,
}) {
    if (!open || !archive) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm">
            <button
                type="button"
                className="absolute inset-0 cursor-default"
                onClick={onClose}
                aria-label="Tutup detail arsip"
            />

            <aside className="absolute right-0 top-0 flex h-full w-full max-w-4xl flex-col bg-neutral-50 shadow-2xl">
                <DetailHeader archive={archive} onClose={onClose} />

                <div className="flex-1 overflow-y-auto px-5 py-5">
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_0.9fr]">
                        <ProfileInfo archive={archive} />

                        <ArchiveInfo
                            archive={archive}
                            onPreviewCv={onPreviewCv}
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
}