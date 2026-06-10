import { AlertCircle } from "lucide-react";

export default function ErrorText({ text }) {
    if (!text) return null;

    return (
        <div className="mt-4 inline-flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="h-4 w-4 mt-[2px] text-red-600" aria-hidden="true" />
            <p className="text-[12px] leading-[1.75] text-red-700">{text}</p>
        </div>
    );
}