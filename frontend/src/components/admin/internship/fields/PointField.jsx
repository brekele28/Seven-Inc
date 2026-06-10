import { Trash2 } from "lucide-react";

export default function PointField({
    value,
    onChange,
    onDelete,
}) {
    return (
        <div className="group flex items-start gap-4 rounded-[28px] border border-neutral-200 bg-gradient-to-br from-white to-red-50/30 p-4 transition duration-300 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/40">
            <textarea
                rows={2}
                value={value}
                onChange={onChange}
                placeholder="Tulis point..."
                className="flex-1 resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-[14px] leading-relaxed text-neutral-700 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
            />

            <button
                type="button"
                onClick={onDelete}
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 transition hover:scale-105 hover:bg-red-100"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    );
}