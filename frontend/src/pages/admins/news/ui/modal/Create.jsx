import ModalLayout from "./ModalLayout";

import Upload from "../field/Upload";

import Sections from "../article/Sections";
import Related from "../article/Related";

export default function Create({
    open,
    onClose,
    mode,
}) {
    const isDetail = mode === "detail";

    const title =
        mode === "detail"
            ? "Detail Berita"
            : mode === "edit"
            ? "Edit Berita"
            : "Tambah Berita";

    return (
        <ModalLayout
            open={open}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-6">
                <div className="rounded-[30px] border border-neutral-200 bg-white p-5">
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                Judul Artikel
                            </label>

                            <input
                                disabled={isDetail}
                                type="text"
                                placeholder="Masukkan judul berita..."
                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                    Nama Penulis
                                </label>

                                <input
                                    disabled={isDetail}
                                    type="text"
                                    placeholder="Bang Alie"
                                    className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                    Tanggal Publish
                                </label>

                                <input
                                    disabled={isDetail}
                                    type="date"
                                    className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                Status
                            </label>

                            <select
                                disabled={isDetail}
                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                            >
                                <option>Draft</option>
                                <option>Published</option>
                            </select>
                        </div>

                        {!isDetail && <Upload />}
                    </div>
                </div>

                <Sections disabled={isDetail} />

                <Related disabled={isDetail} />

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-12 rounded-2xl border border-neutral-200 bg-white px-5 text-[13px] font-bold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                    >
                        Tutup
                    </button>

                    {!isDetail && (
                        <button
                            type="button"
                            className="h-12 rounded-2xl bg-red-600 px-6 text-[13px] font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 cursor-pointer"
                        >
                            Simpan Berita
                        </button>
                    )}
                </div>
            </div>
        </ModalLayout>
    );
}