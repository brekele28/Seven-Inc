export default function Header({ title, company }) {
    return (
        <header className="mt-5">
            <h1 className="text-[18px] md:text-[22px] font-extrabold text-neutral-900">
                {title}
            </h1>
            <p className="mt-1 text-[12px] font-medium text-neutral-500">{company}</p>
        </header>
    );
}