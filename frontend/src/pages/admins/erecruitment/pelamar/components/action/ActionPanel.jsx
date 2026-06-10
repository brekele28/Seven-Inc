import { useState } from "react";

import InterviewForm from "./InterviewForm";
import StatusAction from "./StatusAction";

function AcceptForm({ loading = false, onSubmit, onCancel }) {
    const [startDate, setStartDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit?.({
            startDate,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-emerald-100 bg-white p-4"
        >
            <p className="text-[12px] font-extrabold text-neutral-900">
                Informasi Penerimaan
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                Tentukan tanggal mulai kerja agar data arsip lebih jelas dan transparan.
            </p>

            <div className="mt-4">
                <label className="text-[11px] font-bold text-neutral-700">
                    Tanggal Mulai Kerja
                </label>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-4 text-[12px] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    required
                    disabled={loading}
                />
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
                    className="rounded-full bg-emerald-600 px-4 py-2 text-[12px] font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? "Menyimpan..." : "Terima Pelamar"}
                </button>
            </div>
        </form>
    );
}

export default function ActionPanel({ applicant, loading = false, onChangeStatus }) {
    const [showInterviewForm, setShowInterviewForm] = useState(false);
    const [showAcceptForm, setShowAcceptForm] = useState(false);

    const isFinal = ["accepted", "rejected", "expired"].includes(applicant.status);
    const lamaranId = applicant.lamaranId || applicant.id;

    const canScreening = applicant.status === "submitted";
    const canInterview = applicant.status === "screening";
    const canAcceptOrReject = !isFinal;

    const handleScreening = async () => {
        await onChangeStatus?.(lamaranId, "screening");
    };

    const handleInterviewSubmit = async (form) => {
        await onChangeStatus?.(lamaranId, "interview", {
            location: form.location,
            date: form.date,
            startTime: form.startTime,
        });

        setShowInterviewForm(false);
    };

    const handleAcceptSubmit = async (form) => {
        await onChangeStatus?.(lamaranId, "accepted", {
            startDate: form.startDate,
        });

        setShowAcceptForm(false);
    };

    const handleReject = async () => {
        await onChangeStatus?.(lamaranId, "rejected");
    };

    return (
        <section>
            <h3 className="text-[13px] font-extrabold text-neutral-900">
                Aksi HRD
            </h3>

            <div className="mt-4 space-y-3">
                <StatusAction
                    label="Lanjut ke Seleksi"
                    description="Tandai pelamar masuk tahap seleksi administrasi."
                    tone="amber"
                    loading={loading}
                    disabled={isFinal || !canScreening}
                    onClick={handleScreening}
                />

                <StatusAction
                    label="Panggil Interview"
                    description={
                        applicant.status === "interview"
                            ? "Pelamar sudah masuk tahap interview."
                            : "Buat jadwal interview dan ubah status pelamar."
                    }
                    tone="violet"
                    loading={loading}
                    disabled={isFinal || !canInterview}
                    onClick={() => {
                        setShowAcceptForm(false);
                        setShowInterviewForm(true);
                    }}
                />

                {showInterviewForm ? (
                    <InterviewForm
                        loading={loading}
                        onSubmit={handleInterviewSubmit}
                        onCancel={() => setShowInterviewForm(false)}
                    />
                ) : null}

                <StatusAction
                    label="Terima Pelamar"
                    description="Status menjadi Diterima dan data otomatis masuk Data Archiving."
                    tone="emerald"
                    loading={loading}
                    disabled={!canAcceptOrReject}
                    onClick={() => {
                        setShowInterviewForm(false);
                        setShowAcceptForm(true);
                    }}
                />

                {showAcceptForm ? (
                    <AcceptForm
                        loading={loading}
                        onSubmit={handleAcceptSubmit}
                        onCancel={() => setShowAcceptForm(false)}
                    />
                ) : null}

                <StatusAction
                    label="Tolak Pelamar"
                    description="Tandai pelamar ditolak. Data dapat dihapus dari tab Ditolak."
                    tone="red"
                    loading={loading}
                    disabled={!canAcceptOrReject}
                    onClick={handleReject}
                />

                {isFinal ? (
                    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                        <p className="text-[12px] font-extrabold text-neutral-900">
                            Status akhir sudah ditentukan
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                            Data diterima otomatis masuk Data Archiving. Data ditolak atau
                            expired dapat dibersihkan melalui tab Ditolak atau Expired.
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
}