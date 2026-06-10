import {
    Pencil,
    Trash2,
} from "lucide-react";

export default function ImageActions({
    onEdit,
    onDelete,
}) {
    return (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            <button
                type="button"
                onClick={onEdit}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition duration-300 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
            >
                <Pencil className="h-4 w-4" />
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}