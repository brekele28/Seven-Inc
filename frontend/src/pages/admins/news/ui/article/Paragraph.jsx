export default function Paragraph({
    number,
    disabled = false,
}) {
    return (
        <div className="rounded-[28px] border border-neutral-200 p-5">
            <div className="flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
                    Section {number}
                </p>

                {!disabled && (
                    <button
                        type="button"
                        className="text-[13px] font-bold text-red-500 cursor-pointer"
                    >
                        Hapus
                    </button>
                )}
            </div>

            <div className="mt-5 space-y-5">
                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Heading
                    </label>

                    <input
                        disabled={disabled}
                        type="text"
                        placeholder="Kondisi Terkini dan Tanggapan Peserta"
                        className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-[14px] outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Description
                    </label>

                    <textarea
                        disabled={disabled}
                        rows={8}
                        placeholder="Tulis isi paragraf..."
                        className="w-full rounded-2xl border border-neutral-200 bg-white px-5 py-5 text-[14px] leading-relaxed outline-none transition disabled:bg-neutral-100 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                    />
                </div>
            </div>
        </div>
    );
}