import { CheckCircle2 } from "lucide-react";

export default function RegisterTerms() {
    const items = [
        "Gunakan email aktif.",
        "Password minimal 8 karakter.",
        "Akses dashboard hanya untuk admin.",
    ];

    return (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-bold text-white">Ketentuan Admin</h3>

            <ul className="mt-4 space-y-3">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-300" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}