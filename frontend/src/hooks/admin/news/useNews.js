import { useState } from "react";

export default function useNews() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [mode, setMode] = useState("create");

    const [selectedNews, setSelectedNews] = useState(null);

    const openCreate = () => {
        setMode("create");
        setSelectedNews(null);
        setIsModalOpen(true);
    };

    const openDetail = (news) => {
        setMode("detail");
        setSelectedNews(news);
        setIsModalOpen(true);
    };

    const openEdit = (news) => {
        setMode("edit");
        setSelectedNews(news);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(
            "https://seveninc.com/news/sample-news"
        );
    };

    return {
        mode,
        selectedNews,
        isModalOpen,

        openCreate,
        openDetail,
        openEdit,
        closeModal,
        copyLink,
    };
}