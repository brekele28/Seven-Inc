import {
    Copy,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

export default function Row({
    item,
    index,
    onDetail,
    onEdit,
    onCopy,
}) {
    return (
        <tr className="border-b border-neutral-100 transition hover:bg-red-50/30">
            <td className="px-6 py-5 text-[14px] font-bold text-neutral-700">
                {index + 1}
            </td>

            <td className="px-6 py-5">
                <div className="h-20 w-32 overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                        alt="News"
                        className="h-full w-full object-cover"
                    />
                </div>
            </td>

            <td className="px-6 py-5">
                <div className="max-w-[300px]">
                    <h3 className="line-clamp-2 text-[15px] font-black leading-relaxed text-neutral-950">
                        {item.title}
                    </h3>
                </div>
            </td>

            <td className="px-6 py-5">
                <span
                    className={`inline-flex rounded-full px-4 py-2 text-[12px] font-black ${
                        item.status === "Published"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                    }`}
                >
                    {item.status}
                </span>
            </td>

            <td className="px-6 py-5 text-[14px] font-medium text-neutral-600">
                28 Jul 2025
            </td>

            <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => onDetail(item)}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <Eye className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                    >
                        <Pencil className="h-5 w-5" />
                    </button>

                    {item.status === "Published" && (
                        <button
                            type="button"
                            onClick={onCopy}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Copy className="h-5 w-5" />
                        </button>
                    )}

                    <button
                        type="button"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
}