const toneClass = {
    blue: {
        badge: "bg-blue-50 text-blue-700 border-blue-100",
        bar: "bg-blue-500",
    },
    amber: {
        badge: "bg-amber-50 text-amber-700 border-amber-100",
        bar: "bg-amber-500",
    },
    violet: {
        badge: "bg-violet-50 text-violet-700 border-violet-100",
        bar: "bg-violet-500",
    },
    emerald: {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
        bar: "bg-emerald-500",
    },
    red: {
        badge: "bg-red-50 text-red-700 border-red-100",
        bar: "bg-red-500",
    },
    neutral: {
        badge: "bg-neutral-50 text-neutral-700 border-neutral-200",
        bar: "bg-neutral-500",
    },
};

export default function StatusSummary({ items = [] }) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-5 py-5">
                <h2 className="text-[16px] font-extrabold text-neutral-900">
                    Ringkasan Status Rekrutmen
                </h2>
                <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                    Distribusi status pelamar berdasarkan tahapan proses.
                </p>
            </div>

            <div className="space-y-5 px-5 py-5">
                {items.map((item) => {
                    const tone = toneClass[item.tone] || toneClass.neutral;

                    return (
                        <div key={item.id}>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={[
                                            "inline-flex rounded-full border px-3 py-1",
                                            "text-[11px] font-extrabold",
                                            tone.badge,
                                        ].join(" ")}
                                    >
                                        {item.label}
                                    </span>

                                    <p className="text-[12px] text-neutral-500">
                                        {item.value} pelamar
                                    </p>
                                </div>

                                <p className="text-[12px] font-extrabold text-neutral-700">
                                    {item.percentage}%
                                </p>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                                <div
                                    className={[
                                        "h-full rounded-full",
                                        tone.bar,
                                    ].join(" ")}
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}