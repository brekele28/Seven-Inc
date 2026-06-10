import TrackerStep from "./TrackerStep";
import { STATUS_UI } from "../../../../../services/user/statuslamaran/data/statuslamaran.ui.dummy";

export default function TrackerCard({ app }) {
    const steps = Array.isArray(app?.timeline) ? app.timeline : [];

    return (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-5 py-5 md:px-8 md:py-7 border-b border-neutral-200">
                <p className="text-[12px] font-extrabold text-neutral-900">
                    {STATUS_UI.single.trackerTitle}
                </p>
                <p className="mt-1 text-[12px] leading-[1.75] text-neutral-600">
                    {STATUS_UI.single.trackerSubtitle}
                </p>
            </div>

            <div className="px-5 py-5 md:px-8 md:py-7 space-y-4">
                {steps.map((s, idx) => (
                    <TrackerStep key={s.key} step={s} isLast={idx === steps.length - 1} />
                ))}
            </div>
        </div>
    );
}