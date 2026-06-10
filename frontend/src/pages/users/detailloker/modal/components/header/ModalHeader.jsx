export default function ModalHeader({ title, subtitle, jobTitle }) {
    return (
        <header className="px-5 pt-6 pb-4 md:px-8 md:pt-8 md:pb-6">
            <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.35em] text-neutral-500 uppercase">
                Lamaran Pekerjaan
            </p>

            <h2 className="mt-2 text-[20px] md:text-[26px] font-extrabold text-neutral-900 leading-[1.15]">
                {title || "Formulir Lamaran"}
            </h2>

            <p className="mt-2 text-[12px] md:text-[13px] leading-[1.85] text-neutral-600 max-w-[720px]">
                {subtitle ||
                    "Lengkapi data berikut untuk melamar. Pastikan dokumen yang diunggah berformat PDF."}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <p className="text-[12px] font-semibold text-neutral-800">
                    Posisi: <span className="text-neutral-900">{jobTitle}</span>
                </p>
            </div>
        </header>
    );
}