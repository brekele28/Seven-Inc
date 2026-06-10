import { ArrowRight } from "lucide-react";

export default function NewsCard({ item, onOpen }) {
    const handleOpen = () => {
        if (typeof onOpen === "function") onOpen(item);
    };

    return (
        <article
            role="button"
            tabIndex={0}
            onClick={handleOpen}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen();
                }
            }}
            className="
        group
        overflow-hidden
        rounded-[14px]
        border border-neutral-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
        cursor-pointer
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-300/50
      "
            aria-label={`Buka berita: ${item.title}`}
        >
            {/* ✅ image wrapper dibuat overflow-hidden biar zoom tidak keluar card */}
            <div className="h-37.5 w-full overflow-hidden">
                <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="
            h-full w-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
                    draggable="false"
                />
            </div>

            <div className="px-5 pt-4 pb-5">
                <p className="text-[11px] font-semibold text-red-500">{item.date}</p>

                <h3 className="mt-2 text-[13px] font-extrabold leading-[1.35] text-neutral-900 line-clamp-2">
                    {item.title}
                </h3>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation(); // supaya klik tombol tidak dobel trigger
                        handleOpen();
                    }}
                    className="
            mt-6
            inline-flex items-center gap-2
            text-[11px] font-semibold
            text-red-500
            transition-colors
            hover:text-red-600
          "
                >
                    Lebih Lanjut
                    <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                </button>
            </div>
        </article>
    );
}