import { Plus } from "lucide-react";

import Paragraph from "./Paragraph";

export default function Sections({
    disabled = false,
}) {
    return (
        <section className="rounded-[30px] border border-neutral-200 bg-white p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-[20px] font-black text-neutral-950">
                        Section Artikel
                    </h3>

                    <p className="mt-2 text-[13px] text-neutral-500">
                        Kelola heading dan isi artikel berita.
                    </p>
                </div>

                {!disabled && (
                    <button
                        type="button"
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-[13px] font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah
                    </button>
                )}
            </div>

            <div className="mt-6 space-y-5">
                <Paragraph
                    number={1}
                    disabled={disabled}
                />

                <Paragraph
                    number={2}
                    disabled={disabled}
                />
            </div>
        </section>
    );
}