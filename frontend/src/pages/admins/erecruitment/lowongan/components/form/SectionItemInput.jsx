import { Plus, Trash2 } from "lucide-react";

export default function SectionItemInput({
    value,
    onChange,
    onRemove,
    onAdd,
    canRemove = true,
    isLast = false,
}) {
    return (
        <div className="flex items-center gap-2">
            <input
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder="Tulis poin kualifikasi..."
                className="h-11 flex-1 rounded-2xl border border-neutral-200 bg-white px-4 text-[12px] font-semibold text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10"
            />

            <button
                type="button"
                onClick={onRemove}
                disabled={!canRemove}
                className={[
                    "inline-flex h-11 w-11 items-center justify-center rounded-2xl border",
                    "transition active:scale-[0.98]",
                    canRemove
                        ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                        : "cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300",
                ].join(" ")}
                aria-label="Hapus poin"
            >
                <Trash2 className="h-4 w-4" />
            </button>

            {isLast ? (
                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98]"
                    aria-label="Tambah poin"
                >
                    <Plus className="h-4 w-4" />
                </button>
            ) : null}
        </div>
    );
}