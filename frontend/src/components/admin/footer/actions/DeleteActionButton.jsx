import { Trash2 } from "lucide-react";

export default function DeleteActionButton({
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:scale-105"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}