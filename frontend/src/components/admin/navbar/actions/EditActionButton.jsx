import { Pencil } from "lucide-react";

export default function EditActionButton({
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
            <Pencil className="h-4 w-4" />
        </button>
    );
}