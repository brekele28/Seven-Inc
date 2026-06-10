import { Pencil } from "lucide-react";

export default function EditActionButton({
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
        >
            <Pencil className="h-4 w-4" />
        </button>
    );
}