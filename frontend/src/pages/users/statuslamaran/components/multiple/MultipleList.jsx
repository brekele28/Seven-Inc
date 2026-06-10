import MultipleItem from "./MultipleItem";
import { STATUS_UI } from "../../../../../services/user/statuslamaran/data/statuslamaran.ui.dummy";

export default function MultipleList({ phone, list = [] }) {
    return (
        <div className="mt-8">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                <div
                    className="px-5 py-5 md:px-8 md:py-7"
                    style={{
                        background:
                            "radial-gradient(60% 70% at 30% 0%, rgba(239,68,68,0.10) 0%, rgba(59,130,246,0.06) 35%, rgba(255,255,255,0) 70%)",
                    }}
                >
                    <p className="text-[12px] font-extrabold text-neutral-900">
                        {STATUS_UI.multi.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-[1.75] text-neutral-600">
                        {STATUS_UI.multi.subtitle}{" "}
                        <span className="font-semibold text-neutral-900">{phone}</span>
                    </p>
                </div>

                <div className="px-5 py-5 md:px-8 md:py-7 space-y-4">
                    {list.map((app) => (
                        <MultipleItem key={app.applicationId} app={app} />
                    ))}
                </div>
            </div>
        </div>
    );
}