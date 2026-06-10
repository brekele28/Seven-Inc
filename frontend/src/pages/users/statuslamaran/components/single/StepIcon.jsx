import { Check, Clock, X, AlertTriangle } from "lucide-react";

export default function StepIcon({ status }) {
    if (status === "done") {
        return (
            <div className="h-9 w-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Check className="h-4 w-4" aria-hidden="true" />
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="h-9 w-9 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-sm">
                <X className="h-4 w-4" aria-hidden="true" />
            </div>
        );
    }

    if (status === "expired") {
        return (
            <div className="h-9 w-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div className="h-9 w-9 rounded-2xl border border-neutral-200 bg-white text-neutral-700 flex items-center justify-center shadow-sm">
            <Clock className="h-4 w-4" aria-hidden="true" />
        </div>
    );
}