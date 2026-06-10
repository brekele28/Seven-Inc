import { ShieldCheck, Sparkles } from "lucide-react";

import ModeSwitch from "./ModeSwitch";
import SearchInput from "./SearchInput";
import SubmitButton from "./SubmitButton";
import ErrorText from "./ErrorText";

import { CEK_LAMARAN_UI } from "../../../../../services/user/ceklamaran/data/ceklamaran.ui.dummy";

export default function SearchCard({
    mode,
    onChangeMode,
    value,
    placeholder,
    onChangeValue,
    errorMsg,
    onSubmit,
    suggestedPhone,
}) {
    return (
        <div className="mt-8 overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(70% 80% at 18% 0%, rgba(239,68,68,0.12) 0%, rgba(59,130,246,0.08) 42%, rgba(255,255,255,0) 72%)",
                    }}
                />

                <div className="relative px-5 py-6 md:px-8 md:py-8">
                    <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2">
                                <Sparkles className="h-4 w-4 text-red-500" aria-hidden="true" />
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-red-600">
                                    Anti Ghosting
                                </p>
                            </div>

                            <h2 className="mt-5 text-[22px] font-extrabold leading-tight text-neutral-950 md:text-[28px]">
                                {CEK_LAMARAN_UI.cardTitle}
                            </h2>

                            <p className="mt-3 max-w-[420px] text-[13px] leading-[1.9] text-neutral-600">
                                {CEK_LAMARAN_UI.cardSubtitle}
                            </p>

                            <div className="mt-6 rounded-3xl border border-neutral-200 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                                    </div>

                                    <div>
                                        <p className="text-[12px] font-extrabold text-neutral-900">
                                            {CEK_LAMARAN_UI.hint.title}
                                        </p>
                                        <p className="mt-1 text-[12px] leading-[1.8] text-neutral-600">
                                            {CEK_LAMARAN_UI.hint.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="rounded-[28px] border border-neutral-200 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur md:p-5">
                            <ModeSwitch mode={mode} onChange={onChangeMode} />

                            <div className="mt-5">
                                <SearchInput
                                    mode={mode}
                                    value={value}
                                    placeholder={placeholder}
                                    onChange={onChangeValue}
                                    suggestedPhone={suggestedPhone}
                                />
                            </div>

                            <div className="mt-4">
                                <SubmitButton />
                            </div>

                            <ErrorText text={errorMsg} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}