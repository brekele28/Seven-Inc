export default function BusinessText({ title, paragraphs = [], reverse }) {
    return (
        <div className={["lg:col-span-7", reverse ? "lg:order-2" : "lg:order-1"].join(" ")}>
            <h3 className="text-[26px] md:text-[30px] font-extrabold text-neutral-900">
                {title}
            </h3>

            <div className="mt-4 space-y-6 text-[14px] leading-[2.05] text-neutral-700">
                {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                ))}
            </div>
        </div>
    );
}