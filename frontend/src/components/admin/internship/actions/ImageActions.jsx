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
                className="
                    flex h-11 w-11 cursor-pointer items-center justify-center
                    rounded-2xl border border-amber-100
                    bg-white/95 text-amber-600 backdrop-blur
                    transition duration-300
                    hover:-translate-y-0.5
                    hover:bg-amber-50
                    hover:shadow-lg
                "
            >
                <Pencil className="h-4 w-4" />
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="
                    flex h-11 w-11 cursor-pointer items-center justify-center
                    rounded-2xl border border-red-100
                    bg-white/95 text-red-500 backdrop-blur
                    transition duration-300
                    hover:-translate-y-0.5
                    hover:bg-red-50
                    hover:shadow-lg
                "
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}