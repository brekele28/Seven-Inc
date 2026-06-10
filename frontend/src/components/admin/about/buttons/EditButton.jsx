import { Pencil } from "lucide-react";

export default function EditButton({
    children = "Edit",
    type = "button",
    onClick,
    className = "",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={[
                "cursor-pointer",
                "inline-flex items-center justify-center gap-2",

                "w-full sm:w-auto",

                "rounded-2xl",
                "border border-amber-200",

                "bg-amber-50",
                "px-5 py-3",

                "text-[13px] font-bold",
                "text-amber-700",

                "transition duration-300",

                "hover:bg-amber-100",
                "hover:border-amber-300",

                "focus:outline-none",
                "focus-visible:ring-4",
                "focus-visible:ring-amber-100",

                "disabled:cursor-not-allowed",
                "disabled:opacity-50",

                className,
            ].join(" ")}
        >
            <Pencil className="h-4 w-4 shrink-0" />

            <span>{children}</span>
        </button>
    );
}