import {
    ImagePlus,
    Trash2,
} from "lucide-react";

export default function InternshipPositionCard({
    title,
    onDelete,
}) {
    return (
        <div className="group relative overflow-hidden rounded-[30px] border border-neutral-200 bg-gradient-to-br from-white via-white to-red-50/40 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-100/40">
            <button
                type="button"
                onClick={onDelete}
                className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 transition hover:scale-105 hover:bg-red-100"
            >
                <Trash2 className="h-5 w-5" />
            </button>

            <button
                type="button"
                className="group/upload flex h-[170px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-neutral-300 bg-white transition hover:border-red-300"
            >
                <div className="flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-100 bg-red-50 transition duration-300 group-hover/upload:scale-105">
                        <ImagePlus className="h-9 w-9 text-red-500" />
                    </div>

                    <p className="mt-4 text-[13px] font-bold text-neutral-500">
                        Upload Icon
                    </p>
                </div>
            </button>

            <div className="mt-5">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Position
                </label>

                <input
                    type="text"
                    defaultValue={title}
                    placeholder="UI Designer"
                    className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-[14px] font-semibold text-neutral-800 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                />
            </div>
        </div>
    );
}