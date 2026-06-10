import { Search } from "lucide-react";

export default function SearchInput({ value, onChange }) {
    return (
        <div className="relative">
            <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                aria-hidden="true"
            />

            <input
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder="Cari nama posisi atau deskripsi lowongan..."
                className={[
                    "h-13 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4",
                    "text-[13px] font-semibold text-neutral-900",
                    "placeholder:text-neutral-400 placeholder:font-medium",
                    "transition focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10",
                ].join(" ")}
            />
        </div>
    );
}