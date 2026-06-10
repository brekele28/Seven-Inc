import { Hash, Phone } from "lucide-react";
import { CEK_LAMARAN_UI } from "../../../../../services/user/ceklamaran/data/ceklamaran.ui.dummy";

function TabButton({ active, label, icon: Icon, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "relative z-10 flex flex-1 items-center justify-center gap-2",
                "rounded-full px-4 py-3",
                "text-[12px] font-extrabold transition-colors duration-300",
                active ? "text-white" : "text-neutral-600 hover:text-neutral-900",
            ].join(" ")}
            aria-pressed={active}
        >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
        </button>
    );
}

export default function ModeSwitch({ mode, onChange }) {
    const isPhone = mode === "phone";

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-extrabold text-neutral-900">
                    {CEK_LAMARAN_UI.modeTitle}
                </p>

                <p className="hidden text-[11px] font-medium text-neutral-500 md:block">
                    Pilih salah satu metode
                </p>
            </div>

            <div className="relative grid w-full grid-cols-2 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                <div
                    className={[
                        "absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full",
                        "bg-neutral-950 shadow-[0_14px_28px_rgba(15,23,42,0.20)]",
                        "transition-transform duration-300 ease-out",
                        isPhone ? "translate-x-[calc(100%+0px)]" : "translate-x-0",
                    ].join(" ")}
                />

                <TabButton
                    active={mode === "id"}
                    label={CEK_LAMARAN_UI.mode.id}
                    icon={Hash}
                    onClick={() => onChange?.("id")}
                />

                <TabButton
                    active={mode === "phone"}
                    label={CEK_LAMARAN_UI.mode.phone}
                    icon={Phone}
                    onClick={() => onChange?.("phone")}
                />
            </div>
        </div>
    );
}