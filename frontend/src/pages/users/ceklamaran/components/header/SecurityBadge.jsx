import { Lock } from "lucide-react";
import { CEK_LAMARAN_UI } from "../../../../../services/user/ceklamaran/data/ceklamaran.ui.dummy";

export default function SecurityBadge() {
    return (
        <div className="mt-3 md:mt-0 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
            <Lock className="h-4 w-4 text-neutral-700" aria-hidden="true" />
            <p className="text-[12px] font-semibold text-neutral-700">
                {CEK_LAMARAN_UI.securityBadge}
            </p>
        </div>
    );
}