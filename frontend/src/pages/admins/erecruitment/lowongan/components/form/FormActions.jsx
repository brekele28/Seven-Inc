export default function FormActions({ mode = "create", error, onClose, onSubmit }) {
    return (
        <div className="sticky bottom-0 border-t border-neutral-200 bg-white/95 px-5 py-4 backdrop-blur">
            {error ? (
                <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-[12px] font-semibold leading-6 text-red-700">
                        {error}
                    </p>
                </div>
            ) : null}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-[12px] font-extrabold text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:scale-[0.99]"
                >
                    Batal
                </button>

                <button
                    type="button"
                    onClick={onSubmit}
                    className="inline-flex items-center justify-center rounded-full bg-red-500 px-7 py-2.5 text-[12px] font-extrabold text-white shadow-[0_14px_30px_-18px_rgba(239,68,68,0.9)] transition hover:bg-red-600 active:scale-[0.99]"
                >
                    {mode === "edit" ? "Simpan Perubahan" : "Simpan Lowongan"}
                </button>
            </div>
        </div>
    );
}