import { useEffect, useMemo, useState } from "react";
import {
    closeLowongan,
    createLowongan,
    deleteLowongan,
    getLowonganList,
    publishLowongan,
    updateLowongan,
} from "../../../services/admin/lowongan/repository/lowongan.repository";

const DEFAULT_FORM = {
    title: "",
    openedAt: "",
    closedAt: "",
    status: "draft",
    intro: "",
    sections: [
        {
            id: "general",
            title: "KUALIFIKASI UMUM",
            items: [""],
        },
        {
            id: "special",
            title: "KUALIFIKASI KHUSUS",
            items: [""],
        },
        {
            id: "responsibility",
            title: "TANGGUNG JAWAB",
            items: [""],
        },
        {
            id: "benefit",
            title: "BENEFIT",
            items: [""],
        },
    ],
};

function normalizeText(value) {
    return String(value || "").toLowerCase().trim();
}

function cloneDefaultForm() {
    return {
        ...DEFAULT_FORM,
        sections: DEFAULT_FORM.sections.map((section) => ({
            ...section,
            items: [...section.items],
        })),
    };
}

function cloneFormFromLowongan(item) {
    if (!item) return cloneDefaultForm();

    return {
        title: item.title || "",
        openedAt: item.openedAt || "",
        closedAt: item.closedAt || "",
        status: item.status || "draft",
        intro: item.intro || "",
        sections:
            Array.isArray(item.sections) && item.sections.length
                ? item.sections.map((section) => ({
                      id: section.id,
                      title: section.title,
                      items:
                          Array.isArray(section.items) && section.items.length
                              ? section.items
                              : [""],
                  }))
                : cloneDefaultForm().sections,
    };
}

function sanitizePayload(form) {
    return {
        title: String(form.title || "").trim(),
        openedAt: String(form.openedAt || "").trim(),
        closedAt: String(form.closedAt || "").trim(),
        status: String(form.status || "draft").trim(),
        intro: String(form.intro || "").trim(),
        sections: Array.isArray(form.sections)
            ? form.sections
                  .map((section, index) => ({
                      id: String(section.id || `section-${index + 1}`).trim(),
                      title: String(section.title || "").trim(),
                      items: Array.isArray(section.items)
                          ? section.items
                                .map((item) => String(item || "").trim())
                                .filter(Boolean)
                          : [],
                  }))
                  .filter((section) => section.title && section.items.length)
            : [],
    };
}

export default function useLowongan() {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("latest");

    const [selectedId, setSelectedId] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [formValues, setFormValues] = useState(cloneDefaultForm());
    const [formError, setFormError] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [confirmState, setConfirmState] = useState({
        open: false,
        type: "",
        id: "",
        title: "",
        description: "",
        confirmText: "",
    });

    const refresh = async () => {
        try {
            setIsLoading(true);
            setError("");

            const next = await getLowonganList();
            setItems(next);
        } catch (err) {
            setError(err?.message || "Gagal memuat data lowongan.");
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    const filteredItems = useMemo(() => {
        const keyword = normalizeText(query);

        const filtered = items.filter((item) => {
            const matchQuery =
                !keyword ||
                normalizeText(item.title).includes(keyword) ||
                normalizeText(item.intro).includes(keyword) ||
                normalizeText(item.status).includes(keyword);

            const matchStatus = status === "all" || item.status === status;

            return matchQuery && matchStatus;
        });

        const sorted = [...filtered];

        if (sort === "latest") {
            sorted.sort((a, b) => new Date(b.openedAt || 0) - new Date(a.openedAt || 0));
        }

        if (sort === "closing-soon") {
            sorted.sort((a, b) => new Date(a.closedAt || 0) - new Date(b.closedAt || 0));
        }

        if (sort === "most-applicant") {
            sorted.sort((a, b) => Number(b.applicantCount || 0) - Number(a.applicantCount || 0));
        }

        return sorted;
    }, [items, query, status, sort]);

    const selectedItem = useMemo(() => {
        if (!selectedId) return filteredItems[0] || null;
        return items.find((item) => item.id === selectedId) || filteredItems[0] || null;
    }, [items, selectedId, filteredItems]);

    const stats = useMemo(() => {
        return {
            total: items.length,
            active: items.filter((item) => item.status === "active").length,
            draft: items.filter((item) => item.status === "draft").length,
            closed: items.filter((item) => item.status === "closed").length,
            expired: items.filter((item) => item.status === "expired").length,
        };
    }, [items]);

    const openCreateForm = () => {
        setFormMode("create");
        setFormValues(cloneDefaultForm());
        setFormError("");
        setFormOpen(true);
    };

    const openEditForm = (item) => {
        if (!item) return;

        setFormMode("edit");
        setSelectedId(item.id);
        setFormValues(cloneFormFromLowongan(item));
        setFormError("");
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setFormError("");
    };

    const updateFormField = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError("");
    };

    const updateSectionTitle = (sectionIndex, value) => {
        setFormValues((prev) => ({
            ...prev,
            sections: prev.sections.map((section, index) =>
                index === sectionIndex
                    ? {
                          ...section,
                          title: value,
                      }
                    : section
            ),
        }));
    };

    const updateSectionItem = (sectionIndex, itemIndex, value) => {
        setFormValues((prev) => ({
            ...prev,
            sections: prev.sections.map((section, index) =>
                index === sectionIndex
                    ? {
                          ...section,
                          items: section.items.map((item, idx) =>
                              idx === itemIndex ? value : item
                          ),
                      }
                    : section
            ),
        }));
    };

    const addSectionItem = (sectionIndex) => {
        setFormValues((prev) => ({
            ...prev,
            sections: prev.sections.map((section, index) =>
                index === sectionIndex
                    ? {
                          ...section,
                          items: [...section.items, ""],
                      }
                    : section
            ),
        }));
    };

    const removeSectionItem = (sectionIndex, itemIndex) => {
        setFormValues((prev) => ({
            ...prev,
            sections: prev.sections.map((section, index) =>
                index === sectionIndex
                    ? {
                          ...section,
                          items:
                              section.items.length > 1
                                  ? section.items.filter((_, idx) => idx !== itemIndex)
                                  : [""],
                      }
                    : section
            ),
        }));
    };

    const addSection = () => {
        setFormValues((prev) => ({
            ...prev,
            sections: [
                ...prev.sections,
                {
                    id: `custom-${Date.now()}`,
                    title: "",
                    items: [""],
                },
            ],
        }));
    };

    const removeSection = (sectionIndex) => {
        setFormValues((prev) => ({
            ...prev,
            sections:
                prev.sections.length > 1
                    ? prev.sections.filter((_, index) => index !== sectionIndex)
                    : prev.sections,
        }));
    };

    const submitForm = async () => {
        const payload = sanitizePayload(formValues);

        if (!payload.title) {
            setFormError("Nama posisi wajib diisi.");
            return;
        }

        if (!payload.openedAt) {
            setFormError("Tanggal buka wajib diisi.");
            return;
        }

        if (!payload.closedAt) {
            setFormError("Tanggal tutup wajib diisi.");
            return;
        }

        if (!payload.intro) {
            setFormError("Deskripsi singkat lowongan wajib diisi.");
            return;
        }

        if (!payload.sections.length) {
            setFormError("Minimal tambahkan satu section detail kualifikasi.");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormError("");

            if (formMode === "edit" && selectedId) {
                const updated = await updateLowongan(selectedId, payload);
                setSelectedId(updated?.id || selectedId);
            } else {
                const created = await createLowongan(payload);
                setSelectedId(created?.id || "");
            }

            await refresh();
            closeForm();
        } catch (err) {
            const firstError = err?.errors
                ? Object.values(err.errors).flat()?.[0]
                : null;

            setFormError(firstError || err?.message || "Gagal menyimpan lowongan.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const requestCloseLowongan = (item) => {
        if (!item) return;

        setConfirmState({
            open: true,
            type: "close",
            id: item.id,
            title: "Tutup lowongan?",
            description: `Lowongan ${item.title} akan ditutup dan tidak tampil sebagai lowongan aktif.`,
            confirmText: "Ya, Tutup",
        });
    };

    const requestDeleteLowongan = (item) => {
        if (!item) return;

        setConfirmState({
            open: true,
            type: "delete",
            id: item.id,
            title: "Hapus lowongan?",
            description: `Lowongan ${item.title} akan dihapus permanen dari daftar.`,
            confirmText: "Ya, Hapus",
        });
    };

    const cancelConfirm = () => {
        setConfirmState({
            open: false,
            type: "",
            id: "",
            title: "",
            description: "",
            confirmText: "",
        });
    };

    const confirmAction = async () => {
        try {
            if (confirmState.type === "close") {
                await closeLowongan(confirmState.id);
            }

            if (confirmState.type === "delete") {
                await deleteLowongan(confirmState.id);

                if (selectedId === confirmState.id) {
                    setSelectedId("");
                }
            }

            await refresh();
        } catch (err) {
            setError(err?.message || "Aksi gagal diproses.");
        } finally {
            cancelConfirm();
        }
    };

    const handlePublish = async (item) => {
        if (!item) return;

        try {
            await publishLowongan(item.id);
            await refresh();
        } catch (err) {
            setError(err?.message || "Gagal menerbitkan lowongan.");
        }
    };

    const resetFilter = () => {
        setQuery("");
        setStatus("all");
        setSort("latest");
    };

    return {
        items,
        filteredItems,
        selectedItem,
        selectedId,
        setSelectedId,
        stats,

        query,
        setQuery,
        status,
        setStatus,
        sort,
        setSort,
        resetFilter,

        isLoading,
        isSubmitting,
        error,

        formOpen,
        formMode,
        formValues,
        formError,
        openCreateForm,
        openEditForm,
        closeForm,
        updateFormField,
        updateSectionTitle,
        updateSectionItem,
        addSectionItem,
        removeSectionItem,
        addSection,
        removeSection,
        submitForm,

        requestCloseLowongan,
        requestDeleteLowongan,
        handlePublish,

        confirmState,
        cancelConfirm,
        confirmAction,
    };
}