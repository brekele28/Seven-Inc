export default function ArticleHeader({ title, date }) {
    return (
        <header>
            <h1
                id="article-title"
                className="text-[22px] sm:text-[26px] md:text-[30px] font-extrabold leading-tight text-neutral-900"
            >
                {title}
            </h1>

            <p className="mt-6 text-[12px] font-semibold text-red-500">{date}</p>
        </header>
    );
}