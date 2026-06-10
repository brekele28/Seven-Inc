import { KeyRound } from "lucide-react";

export default function PinHeader() {
    return (
        <div className="mx-auto max-w-xl">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-300/30">
                <KeyRound className="h-8 w-8" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">
                Security Gate
            </p>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
                Verifikasi PIN Admin
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-300">
                Masukkan 6 digit PIN keamanan untuk membuka akses login dan
                registrasi admin.
            </p>
        </div>
    );
}