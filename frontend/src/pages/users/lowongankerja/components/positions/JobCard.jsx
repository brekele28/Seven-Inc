import JobMeta from "./JobMeta";

export default function JobCard({ job, buttonText = "Selengkapnya", onClick }) {
    const title = job?.title ?? "";
    const company = job?.company ?? "";
    const meta = job?.meta ?? { position: "-", location: "-", closeDate: "-" };

    return (
        <article className="rounded-[18px] border border-neutral-200 bg-white">
            <div className="flex flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                <div>
                    <h3 className="text-[16px] md:text-[18px] font-extrabold text-neutral-900">
                        {title}
                    </h3>
                    <p className="mt-1 text-[12px] font-medium text-neutral-500">
                        {company}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClick}
                    className="
            w-fit
            rounded-full
            bg-red-500
            px-6 py-3
            text-[13px] font-semibold text-white
            shadow-sm
            transition
            hover:bg-red-600
            active:scale-95
          "
                    aria-label={`${buttonText} ${title}`}
                >
                    {buttonText}
                </button>
            </div>

            <div className="h-px w-full bg-neutral-200" />

            <JobMeta meta={meta} />
        </article>
    );
}