export default function InfoRow({ icon: Icon, title, children }) {
    return (
        <div className="space-y-2">
            <h3 className="text-[24px] font-extrabold text-white">{title}</h3>
            <div className="flex gap-3 text-[13px] leading-relaxed text-white/90">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                <div className="min-w-0">{children}</div>
            </div>
        </div>
    );
}