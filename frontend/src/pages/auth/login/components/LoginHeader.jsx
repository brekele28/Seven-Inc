import { ShieldCheck } from "lucide-react";

export default function LoginHeader() {
    return (
        <div className="flex h-full flex-col justify-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-300/30">
                <ShieldCheck className="h-7 w-7" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">
                Admin Access
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight text-white">
                Masuk ke Dashboard E-Recruitment
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                Kelola lowongan, data pelamar, berita, internship, dan konten website
                Seven INC melalui ruang kendali admin yang aman.
            </p>
        </div>
    );
}