import { useEffect, useMemo, useRef, useState } from "react";
import { Download, FileText, X } from "lucide-react";

function sanitizeFileName(value = "") {
    return String(value || "")
        .trim()
        .replace(/[\\/:*?"<>|]/g, "-")
        .replace(/\s+/g, " ")
        .replace(/-+/g, "-");
}

function getDefaultFileName() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `Laporan Data Archiving Seven INC ${day}-${month}-${year}`;
}

function ExportFileNameForm({
    initialFileName,
    onClose,
    onSubmit,
}) {
    const inputRef = useRef(null);
    const closeBtnRef = useRef(null);

    const [fileName, setFileName] = useState(initialFileName);
    const [error, setError] = useState("");

    const cleanFileName = sanitizeFileName(fileName);

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 50);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cleanFileName) {
            setError("Nama file wajib diisi.");
            inputRef.current?.focus();
            return;
        }

        onSubmit?.(cleanFileName);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={[
                "relative w-full max-w-lg overflow-hidden rounded-[28px]",
                "border border-white/50 bg-zinc-50/80 backdrop-blur-2xl",
                "shadow-[0_30px_90px_rgba(15,23,42,0.22),0_10px_30px_rgba(15,23,42,0.12)]",
            ].join(" ")}
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-90"
                style={{
                    background:
                        "radial-gradient(70% 85% at 20% 0%, rgba(220,38,38,0.16) 0%, rgba(16,185,129,0.12) 38%, rgba(244,244,245,0) 72%)",
                }}
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-white/55 px-6 py-6">
                <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/60 bg-white/55 text-red-600 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                        <FileText className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-600">
                            Export PDF
                        </p>
                        <h3 className="mt-2 text-[22px] font-black tracking-[-0.04em] text-slate-900">
                            Nama File Laporan
                        </h3>
                        <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                            Tentukan nama file sebelum laporan disimpan sebagai PDF.
                        </p>
                    </div>
                </div>

                <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={onClose}
                    className={[
                        "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
                        "border border-white/60 bg-white/55 text-slate-600 backdrop-blur-xl",
                        "shadow-[0_10px_26px_rgba(15,23,42,0.08)]",
                        "transition hover:bg-white/80 hover:text-slate-900 active:scale-95",
                    ].join(" ")}
                    aria-label="Tutup"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="relative px-6 py-6">
                <label
                    htmlFor="export-file-name"
                    className="text-[12px] font-extrabold text-slate-700"
                >
                    Nama file
                </label>

                <div className="mt-2 rounded-2xl border border-white/60 bg-white/60 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                    <input
                        ref={inputRef}
                        id="export-file-name"
                        type="text"
                        value={fileName}
                        onChange={(e) => {
                            setFileName(e.target.value);
                            setError("");
                        }}
                        className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none placeholder:text-slate-400"
                        placeholder="Contoh: Laporan Data Archiving Mei 2026"
                    />
                </div>

                {error ? (
                    <p className="mt-2 text-[12px] font-bold text-red-600">
                        {error}
                    </p>
                ) : (
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                        Ekstensi <span className="font-bold">.pdf</span> akan
                        mengikuti dari browser saat admin menyimpan laporan.
                    </p>
                )}
            </div>

            <div className="relative flex flex-col-reverse gap-2 border-t border-white/55 bg-white/35 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className={[
                        "inline-flex cursor-pointer items-center justify-center rounded-full",
                        "border border-white/70 bg-white/60 px-5 py-2.5",
                        "text-[12px] font-black text-slate-700",
                        "shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl",
                        "transition hover:bg-white/85 active:scale-[0.98]",
                    ].join(" ")}
                >
                    Batal
                </button>

                <button
                    type="submit"
                    className={[
                        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full",
                        "bg-red-600 px-5 py-2.5",
                        "text-[12px] font-black text-white",
                        "shadow-[0_18px_38px_rgba(220,38,38,0.22)]",
                        "transition hover:bg-red-700 active:scale-[0.98]",
                    ].join(" ")}
                >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Export PDF
                </button>
            </div>
        </form>
    );
}

export default function ExportFileNameModal({
    open = false,
    onClose,
    onSubmit,
    defaultFileName = "",
}) {
    const initialFileName = useMemo(() => {
        return sanitizeFileName(defaultFileName) || getDefaultFileName();
    }, [defaultFileName]);

    useEffect(() => {
        if (!open) return undefined;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-xl">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 cursor-default"
                aria-label="Tutup modal penamaan file"
            />

            <ExportFileNameForm
                key={initialFileName}
                initialFileName={initialFileName}
                onClose={onClose}
                onSubmit={onSubmit}
            />
        </div>
    );
}