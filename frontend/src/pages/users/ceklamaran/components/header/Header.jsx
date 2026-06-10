import { CEK_LAMARAN_UI } from "../../../../../services/user/ceklamaran/data/ceklamaran.ui.dummy";

export default function Header() {
    return (
        <div className="pt-3">
            <p className="text-[12px] font-semibold tracking-[0.45em] text-neutral-700 uppercase">
                {CEK_LAMARAN_UI.header.eyebrow}
            </p>

            <h1 className="mt-4 text-[20px] md:text-[28px] font-extrabold text-neutral-900">
                {CEK_LAMARAN_UI.header.title}
            </h1>

            <p className="mt-2 text-[12px] md:text-[13px] leading-[1.85] text-neutral-600 max-w-[720px]">
                {CEK_LAMARAN_UI.header.subtitle}
            </p>
        </div>
    );
}