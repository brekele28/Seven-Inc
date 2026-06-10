import { getPelamarList } from "../../pelamar/repository/pelamar.repository";

function calculatePercentage(value, total) {
    if (!total) return 0;

    return Math.round((value / total) * 100);
}

function createPriorityItem(id, total, title, description, level) {
    if (total <= 0) return null;

    return {
        id,
        title: `${total} ${title}`,
        description,
        level,
    };
}

export async function getDashboardData() {
    const applicants = await getPelamarList();

    const totalApplicants = applicants.length;

    const submittedApplicants = applicants.filter(
        (item) => item.status === "submitted"
    );

    const screeningApplicants = applicants.filter(
        (item) => item.status === "screening"
    );

    const interviewApplicants = applicants.filter(
        (item) => item.status === "interview"
    );

    const acceptedApplicants = applicants.filter(
        (item) => item.status === "accepted"
    );

    const rejectedApplicants = applicants.filter(
        (item) => item.status === "rejected"
    );

    const expiredApplicants = applicants.filter(
        (item) => item.status === "expired"
    );

    const urgentApplicants = applicants.filter((item) => {
        return (
            item.deadlineLevel === "danger" ||
            item.deadlineLevel === "expired"
        );
    });

    const unscheduledInterviewApplicants = interviewApplicants.filter(
        (item) => {
            return !item.interview?.date;
        }
    );

    const stats = [
        {
            id: "total",
            title: "Total Lamaran",
            value: totalApplicants,
            description: "Seluruh lamaran yang masuk ke sistem.",
            tone: "blue",
            icon: "FileText",
            actionLabel: "Lihat semua",
            to: "/admin/e-recruitment/pelamar?status=all",
        },
        {
            id: "new",
            title: "Lamaran Baru",
            value: submittedApplicants.length,
            description: "Belum direview oleh HRD.",
            tone: "red",
            icon: "Inbox",
            actionLabel: "Review sekarang",
            to: "/admin/e-recruitment/pelamar?status=process",
        },
        {
            id: "screening",
            title: "Seleksi",
            value: screeningApplicants.length,
            description: "Sedang dalam tahap administrasi.",
            tone: "amber",
            icon: "ClipboardCheck",
            actionLabel: "Lihat seleksi",
            to: "/admin/e-recruitment/pelamar?status=screening",
        },
        {
            id: "interview",
            title: "Interview",
            value: interviewApplicants.length,
            description: "Menunggu jadwal atau hasil interview.",
            tone: "violet",
            icon: "CalendarClock",
            actionLabel: "Kelola interview",
            to: "/admin/e-recruitment/pelamar?status=interview",
        },
        {
            id: "accepted",
            title: "Diterima",
            value: acceptedApplicants.length,
            description: "Pelamar lolos keputusan akhir.",
            tone: "emerald",
            icon: "BadgeCheck",
            actionLabel: "Lihat arsip",
            to: "/admin/e-recruitment/data-archiving",
        },
        {
            id: "urgent",
            title: "Butuh Tindakan",
            value:
                urgentApplicants.length +
                unscheduledInterviewApplicants.length,
            description:
                "Lamaran hampir expired atau interview belum dijadwalkan.",
            tone: "amber",
            icon: "TimerReset",
            actionLabel: "Cek prioritas",
            to: "/admin/e-recruitment/pelamar?status=process",
        },
    ];

    const statusSummary = [
        {
            id: "submitted",
            label: "Lamaran Baru",
            value: submittedApplicants.length,
            percentage: calculatePercentage(
                submittedApplicants.length,
                totalApplicants
            ),
            status: "submitted",
            tone: "blue",
        },
        {
            id: "screening",
            label: "Seleksi Administrasi",
            value: screeningApplicants.length,
            percentage: calculatePercentage(
                screeningApplicants.length,
                totalApplicants
            ),
            status: "screening",
            tone: "amber",
        },
        {
            id: "interview",
            label: "Interview",
            value: interviewApplicants.length,
            percentage: calculatePercentage(
                interviewApplicants.length,
                totalApplicants
            ),
            status: "interview",
            tone: "violet",
        },
        {
            id: "accepted",
            label: "Diterima",
            value: acceptedApplicants.length,
            percentage: calculatePercentage(
                acceptedApplicants.length,
                totalApplicants
            ),
            status: "accepted",
            tone: "emerald",
        },
        {
            id: "rejected",
            label: "Ditolak",
            value: rejectedApplicants.length,
            percentage: calculatePercentage(
                rejectedApplicants.length,
                totalApplicants
            ),
            status: "rejected",
            tone: "red",
        },
        {
            id: "expired",
            label: "Expired",
            value: expiredApplicants.length,
            percentage: calculatePercentage(
                expiredApplicants.length,
                totalApplicants
            ),
            status: "expired",
            tone: "neutral",
        },
    ];

    const priorities = [
        createPriorityItem(
            "priority-1",
            urgentApplicants.length,
            "lamaran hampir expired",
            "Segera review lamaran yang mendekati batas waktu seleksi.",
            "urgent"
        ),

        createPriorityItem(
            "priority-2",
            submittedApplicants.length,
            "lamaran baru belum direview",
            "Cek data pelamar dan CV yang masuk hari ini.",
            "warning"
        ),

        createPriorityItem(
            "priority-3",
            unscheduledInterviewApplicants.length,
            "interview perlu dijadwalkan",
            "Lengkapi informasi tanggal, jam, dan link interview.",
            "info"
        ),
    ].filter(Boolean);

    return {
        stats,
        priorities,
        statusSummary,
    };
}