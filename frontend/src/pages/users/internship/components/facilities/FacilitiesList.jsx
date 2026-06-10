export default function FacilitiesList({ items }) {
    return (
        <div className="lg:col-span-6">
            <ol className="list-decimal pl-5 space-y-2.5 text-[12px] md:text-[13px] leading-[1.95] text-neutral-700">
                {Array.isArray(items) ? items.map((text) => <li key={text}>{text}</li>) : null}
            </ol>
        </div>
    );
}