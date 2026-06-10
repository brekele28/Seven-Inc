import EmptyState from "../../../../../../components/admin/lowongan/table/EmptyState";
import TableHeader from "./TableHeader";
import LowonganRow from "./LowonganRow";

export default function LowonganTable({
    items = [],
    selectedId,
    onSelect,
    onEdit,
    onClose,
    onDelete,
    onPublish,
}) {
    return (
        <div className="overflow-hidden rounded-[26px] border border-neutral-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <div className="border-b border-neutral-100 px-5 py-5">
                <p className="text-[15px] font-black text-neutral-950">
                    Daftar Lowongan
                </p>
                <p className="mt-1 text-[12px] leading-6 text-neutral-500">
                    Kelola posisi yang akan tampil pada halaman lowongan kerja user.
                </p>
            </div>

            {!items.length ? (
                <div className="p-5">
                    <EmptyState />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <div className="max-h-[760px] overflow-y-auto">
                        <table className="w-full min-w-[980px] border-collapse">
                            <TableHeader />
                            <tbody>
                                {items.map((item, index) => (
                                    <LowonganRow
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        selected={selectedId === item.id}
                                        onSelect={onSelect}
                                        onEdit={onEdit}
                                        onClose={onClose}
                                        onDelete={onDelete}
                                        onPublish={onPublish}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}