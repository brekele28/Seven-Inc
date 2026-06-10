import {
    FileText,
    Eye,
    PencilLine,
} from "lucide-react";

const items = [
    {
        title: "Total Berita",
        value: "12",
        icon: FileText,
    },
    {
        title: "Published",
        value: "8",
        icon: Eye,
    },
    {
        title: "Draft",
        value: "3",
        icon: PencilLine,
    },
];

export default function Stats() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="rounded-[28px] border border-neutral-200 bg-gradient-to-br from-white to-red-50/40 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-100"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                                    {item.title}
                                </p>

                                <h3 className="mt-3 text-[30px] font-black text-neutral-950">
                                    {item.value}
                                </h3>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
                                <Icon className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}