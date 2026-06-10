import { Plus, Search } from "lucide-react";

export default function Toolbar({ onCreate }) {
    return (
        <section className="rounded-[30px] border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-1 flex-col gap-4 lg:flex-row">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                        <input
                            type="text"
                            placeholder="Cari judul berita..."
                            className="h-14 w-full rounded-2xl border border-neutral-200 bg-white pl-12 pr-5 text-[14px] outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <select className="h-14 rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] font-medium outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100">
                        <option>Semua Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={onCreate}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 text-[14px] font-bold text-white shadow-lg shadow-red-200 transition duration-300 hover:bg-red-700 cursor-pointer"
                >
                    <Plus className="h-5 w-5" />
                    Tambah Berita
                </button>
            </div>
        </section>
    );
}