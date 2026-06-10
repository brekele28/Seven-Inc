import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function MultipleItem({ app }) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold text-neutral-900">
                        {app.jobTitle}
                    </p>
                    <p className="mt-1 text-[12px] text-neutral-600">
                        ID:{" "}
                        <span className="font-semibold tracking-[0.12em] text-neutral-900">
                            {app.applicationId}
                        </span>
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500">
                        Terakhir update: {app.updatedAtLabel}
                    </p>
                </div>

                <Link
                    to={`/cek-lamaran/status/${app.applicationId}`}
                    className="
            inline-flex items-center justify-center gap-2
            rounded-full bg-red-500 px-5 py-2.5
            text-[12px] font-semibold text-white
            shadow-[0_14px_28px_-18px_rgba(239,68,68,0.65)]
            transition hover:bg-red-600 active:scale-95
          "
                >
                    Lihat Detail <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}