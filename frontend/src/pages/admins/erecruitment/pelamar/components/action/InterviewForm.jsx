import { useState } from "react";

export default function InterviewForm({ loading = false, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        location: "",
        date: "",
        startTime: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit?.({
            location: form.location,
            date: form.date,
            startTime: form.startTime,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-violet-100 bg-white p-4"
        >
            <p className="text-[12px] font-extrabold text-neutral-900">
                Informasi Interview
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                Isi lokasi interview. Bisa berupa link Zoom, Google Meet, Google Maps, atau alamat fisik.
            </p>

            <div className="mt-4 space-y-3">
                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Link Zoom / Google Meet / Google Maps / Lokasi Interview"
                    className="h-11 w-full rounded-xl border border-neutral-200 px-4 text-[12px] focus:outline-none focus:ring-2 focus:ring-violet-100"
                    required
                    disabled={loading}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="h-11 rounded-xl border border-neutral-200 px-4 text-[12px] focus:outline-none focus:ring-2 focus:ring-violet-100"
                        required
                        disabled={loading}
                    />

                    <input
                        name="startTime"
                        type="time"
                        value={form.startTime}
                        onChange={handleChange}
                        className="h-11 rounded-xl border border-neutral-200 px-4 text-[12px] focus:outline-none focus:ring-2 focus:ring-violet-100"
                        required
                        disabled={loading}
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Batal
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-neutral-900 px-4 py-2 text-[12px] font-bold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? "Menyimpan..." : "Simpan Interview"}
                </button>
            </div>
        </form>
    );
}