import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "../logic/clipboard";

export default function SuccessIdBox({ applicationId }) {
    const [copied, setCopied] = useState(false);

    const doCopy = async () => {
        const ok = await copyToClipboard(applicationId);
        setCopied(ok);
        if (ok) setTimeout(() => setCopied(false), 1400);
    };

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
            <p className="text-[12px] font-extrabold text-neutral-900">
                ID Unik Lamaran Kamu
            </p>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                    <p className="text-[13px] font-extrabold tracking-[0.18em] text-neutral-900">
                        {applicationId}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500">
                        Simpan ID ini untuk cek status lamaran.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={doCopy}
                    className={[
                        "inline-flex items-center justify-center gap-2",
                        "rounded-full border border-neutral-200 bg-white",
                        "px-5 py-2.5 text-[12px] font-semibold text-neutral-800",
                        "shadow-sm transition active:scale-95",
                        "hover:bg-neutral-50",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50",
                    ].join(" ")}
                >
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Tersalin" : "Copy ID"}
                </button>
            </div>
        </div>
    );
}