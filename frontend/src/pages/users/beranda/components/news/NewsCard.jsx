import { ArrowRight } from "lucide-react";

export default function NewsCard({ news }) {
    return (
        <article
            className="
        flex flex-col h-full
        overflow-hidden rounded-2xl border border-neutral-200 bg-white
        shadow-[0_10px_24px_rgba(0,0,0,0.06)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.10)]
      "
        >
            <div className="p-5 pb-0">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                        draggable="false"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <p className="text-sm font-semibold text-red-600">{news.date}</p>

                <h3 className="mt-2 text-lg font-extrabold leading-snug text-neutral-900 line-clamp-2">
                    {news.title}
                </h3>

                <div className="mt-auto pt-6">
                    <button
                        type="button"
                        className="
              inline-flex items-center gap-2
              text-sm font-extrabold text-red-600
              hover:text-red-700 transition-colors
            "
                    >
                        Lebih Lanjut <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </article>
    );
}