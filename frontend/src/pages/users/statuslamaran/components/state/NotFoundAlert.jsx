import { AlertTriangle } from "lucide-react";
import { STATUS_UI } from "../../../../../services/user/statuslamaran/data/statuslamaran.ui.dummy";

export default function NotFoundAlert({ show }) {
    if (!show) return null;

    return (
        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-[2px] text-amber-700" aria-hidden="true" />
                <div>
                    <p className="text-[12px] font-extrabold text-amber-900">
                        {STATUS_UI.notFound.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-[1.75] text-amber-800">
                        {STATUS_UI.notFound.text}
                    </p>
                </div>
            </div>
        </div>
    );
}