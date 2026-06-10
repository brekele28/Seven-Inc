import { Check, Clock, ExternalLink, X } from "lucide-react";

function TimelineIcon({ status }) {
    if (status === "done") {
        return (
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <Check className="h-4 w-4" aria-hidden="true" />
            </div>
        );
    }

    if (status === "failed" || status === "expired") {
        return (
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-red-600 text-white">
                <X className="h-4 w-4" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-600">
            <Clock className="h-4 w-4" aria-hidden="true" />
        </div>
    );
}

function isUrl(value = "") {
    return /^https?:\/\//i.test(String(value || "").trim());
}

function InterviewNote({ note }) {
    if (!note) return null;

    const parts = String(note)
        .split("•")
        .map((item) => item.trim())
        .filter(Boolean);

    const locationPart = parts.find((item) => item.toLowerCase().startsWith("lokasi/media:"));
    const timePart = parts.find((item) => item.toLowerCase().startsWith("jam:"));

    const location = locationPart ? locationPart.replace(/^lokasi\/media:\s*/i, "") : "";
    const time = timePart ? timePart.replace(/^jam:\s*/i, "") : "";

    return (
        <div className="mt-3 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-violet-700">
                Jadwal Interview
            </p>

            {location ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="text-[12px] font-semibold leading-relaxed text-violet-900">
                        {location}
                    </p>

                    {isUrl(location) ? (
                        <a
                            href={location}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-violet-700"
                        >
                            Buka Link <ExternalLink className="h-3 w-3" />
                        </a>
                    ) : null}
                </div>
            ) : null}

            {time ? (
                <p className="mt-2 text-[12px] font-semibold text-violet-800">
                    {time}
                </p>
            ) : null}
        </div>
    );
}

export default function RecruitmentTimeline({ timeline = [] }) {
    return (
        <section>
            <h3 className="text-[13px] font-extrabold text-neutral-900">
                Timeline Rekrutmen
            </h3>

            <div className="mt-4 space-y-4">
                {timeline.map((step, index) => (
                    <div key={step.key} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                            <TimelineIcon status={step.status} />
                            {index !== timeline.length - 1 ? (
                                <div className="mt-1 min-h-8 w-px flex-1 bg-neutral-200" />
                            ) : null}
                        </div>

                        <div className="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-[12px] font-extrabold text-neutral-900">
                                        {step.title}
                                    </p>
                                    <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                                        {step.description}
                                    </p>
                                </div>

                                <p className="shrink-0 text-[11px] font-semibold text-neutral-400">
                                    {step.dateLabel}
                                </p>
                            </div>

                            {step.key === "interview" ? (
                                <InterviewNote note={step.note} />
                            ) : step.note ? (
                                <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                                    <p className="text-[12px] leading-relaxed text-neutral-600">
                                        {step.note}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}