import { UserPlus } from "lucide-react";

export default function RegisterHeader() {
    return (
        <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-300/30">
                <UserPlus className="h-7 w-7" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">
                Create Admin
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight">
                Registrasi Akun Admin
            </h1>

            <p className="mt-5 text-sm leading-7 text-slate-300">
                Pendaftaran admin hanya bisa dilakukan setelah verifikasi PIN berhasil.
                Gunakan data yang valid untuk menjaga keamanan dashboard.
            </p>
        </div>
    );
}