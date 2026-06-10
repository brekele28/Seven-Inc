import EmptyState from "../../../../../../components/admin/pelamar/table/EmptyState";

import TableHeader from "./TableHeader";
import PelamarRow from "./PelamarRow";

const TABLE_SCROLL_LIMIT = 5;

export default function PelamarTable({
    applicants = [],
    onDetail,
    canDeleteRows = false,
    onDelete,
}) {
    if (!applicants.length) {
        return <EmptyState />;
    }

    const shouldScroll = applicants.length > TABLE_SCROLL_LIMIT;

    return (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div
                className={[
                    "overflow-x-auto",
                    shouldScroll
                        ? "max-h-[536px] overflow-y-auto overscroll-contain"
                        : "",
                    shouldScroll
                        ? "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2"
                        : "",
                    shouldScroll
                        ? "[&::-webkit-scrollbar-track]:bg-neutral-100"
                        : "",
                    shouldScroll
                        ? "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300"
                        : "",
                    shouldScroll
                        ? "hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400"
                        : "",
                ].join(" ")}
            >
                <table className="w-full min-w-[1080px] border-collapse">
                    <TableHeader />

                    <tbody>
                        {applicants.map((applicant, index) => (
                            <PelamarRow
                                key={applicant.applicationId}
                                number={index + 1}
                                applicant={applicant}
                                onDetail={onDetail}
                                canDelete={
                                    canDeleteRows &&
                                    ["rejected", "expired"].includes(applicant.status)
                                }
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}