import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ArticleContent from "./components/article/ArticleContent";
import { getNewsById } from "../../../services/user/berita/beritaRepository";

export default function IsiBerita() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page") || "1";

    const article = useMemo(() => {
        return getNewsById(id);
    }, [id]);

    return (
        <ArticleContent
            data={{
                title: article.title,
                date: article.date,
                imageSrc: article.imageSrc,
            }}
            // ✅ balik ke halaman berita yang sama
            backTo={`/berita?page=${page}`}
        />
    );
}