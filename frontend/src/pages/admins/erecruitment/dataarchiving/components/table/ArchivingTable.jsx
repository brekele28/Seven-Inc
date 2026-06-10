import EmptyState from "../../../../../../components/admin/archiving/table/EmptyState";

import TableHeader from "./TableHeader";
import ArchivingRow from "./ArchivingRow";

const TABLE_SCROLL_LIMIT = 5;

export default function ArchivingTable({ archives = [], onDetail }) {
    if (!archives.length) {
        return <EmptyState />;
    }

    const shouldScroll = archives.length > TABLE_SCROLL_LIMIT;

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
                <table className="w-full min-w-[1040px] border-collapse">
                    <TableHeader />

                    <tbody>
                        {archives.map((archive, index) => (
                            <ArchivingRow
                                key={archive.applicationId}
                                number={index + 1}
                                archive={archive}
                                onDetail={onDetail}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}