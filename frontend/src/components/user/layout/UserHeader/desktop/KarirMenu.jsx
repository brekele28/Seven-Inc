import { ArrowDownIcon, ArrowRightIcon } from "./NavIcons";

export default function KarirMenu({
    wrapperRef,
    linkBase,
    openKarir,
    setOpenKarir,
    delayedNavigate,
}) {
    return (
        <div ref={wrapperRef} className="relative">
            <button
                type="button"
                onClick={() => setOpenKarir((v) => !v)}
                className={`${linkBase} inline-flex items-center gap-2 cursor-pointer`}
                aria-haspopup="menu"
                aria-expanded={openKarir}
            >
                Karir
                {openKarir ? (
                    <ArrowDownIcon className="h-4 w-4" />
                ) : (
                    <ArrowRightIcon className="h-4 w-4" />
                )}
            </button>

            {openKarir && (
                <div
                    className="absolute -right-20 top-[calc(100%+10px)] z-50 w-52 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl"
                    role="menu"
                >
                    <button
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                        onClick={() => delayedNavigate("/internship", { closeKarir: true })}
                        role="menuitem"
                    >
                        Internship
                    </button>

                    <button
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                        onClick={() => delayedNavigate("/lowongan-kerja", { closeKarir: true })}
                        role="menuitem"
                    >
                        Lowongan Kerja
                    </button>

                    {/* ✅ NEW: Cek Lamaran */}
                    <button
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                        onClick={() => delayedNavigate("/cek-lamaran", { closeKarir: true })}
                        role="menuitem"
                    >
                        Cek Lamaran
                    </button>
                </div>
            )}
        </div>
    );
}