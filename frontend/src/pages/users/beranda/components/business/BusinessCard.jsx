export default function BusinessCard({ title, img, onClick, onKeyDown }) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-label={`Buka detail ${title}`}
            className="
        rounded-[28px]
        border border-neutral-100
        bg-white
        shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        transition
        hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
        cursor-pointer
        focus:outline-none
        focus:ring-2
        focus:ring-red-400/40
      "
        >
            {/* Tinggi card dibuat seragam, isi di-center */}
            <div className="flex h-85 flex-col items-center justify-center px-6">
                <img
                    src={img}
                    alt={title}
                    className="h-16 md:h-24 w-auto select-none"
                    draggable="false"
                />

                {/* Jarak sedikit seperti desain */}
                <p className="mt-4 text-base font-extrabold text-neutral-900">{title}</p>
            </div>
        </div>
    );
}