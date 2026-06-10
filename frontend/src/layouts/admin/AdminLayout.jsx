import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
    LayoutDashboard,
    Newspaper,
    BriefcaseBusiness,
    GraduationCap,
    PanelBottom,
    BadgeCheck,
    Gauge,
    Users,
    Briefcase,
    Archive,
    MonitorCog,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import {
    getAdminProfile,
    logoutAdmin,
} from "../../api/auth/AuthApi";
import { clearAdminSession } from "../../api/auth/AuthStorage";

const adminMenus = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: Gauge,
        end: true,
    },
    {
        label: "About",
        path: "/admin/about",
        icon: BadgeCheck,
    },
    {
        label: "Business",
        path: "/admin/business",
        icon: BriefcaseBusiness,
    },
    {
        label: "News",
        path: "/admin/news",
        icon: Newspaper,
    },
    {
        label: "Internship",
        path: "/admin/internship",
        icon: GraduationCap,
    },
    {
        label: "E-Recruitment",
        icon: Briefcase,
        children: [
            {
                label: "Pelamar",
                path: "/admin/e-recruitment/pelamar",
                icon: Users,
            },
            {
                label: "Lowongan",
                path: "/admin/e-recruitment/lowongan",
                icon: Briefcase,
            },
            {
                label: "Data Archiving",
                path: "/admin/e-recruitment/data-archiving",
                icon: Archive,
            },
            {
                label: "Tampilan",
                path: "/admin/e-recruitment/tampilan",
                icon: MonitorCog,
            },
        ],
    },
    {
        label: "Navbar",
        path: "/admin/navbar",
        icon: LayoutDashboard,
    },
    {
        label: "Footer",
        path: "/admin/footer",
        icon: PanelBottom,
    },
];

function findActiveTitle(pathname) {
    if (pathname === "/admin" || pathname === "/admin/dashboard") {
        return "Dashboard";
    }

    for (const menu of adminMenus) {
        if (menu.children?.length) {
            const activeChild = menu.children.find((child) =>
                pathname.startsWith(child.path)
            );

            if (activeChild) {
                return activeChild.label;
            }

            continue;
        }

        if (menu.path && pathname.startsWith(menu.path)) {
            return menu.label;
        }
    }

    return "Dashboard";
}

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [adminProfile, setAdminProfile] = useState(null);
    const [isProfileReady, setIsProfileReady] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const pathname = location.pathname;
    const activeTitle = findActiveTitle(pathname);

    useEffect(() => {
        let active = true;

        async function loadAdminProfile() {
            try {
                const profile = await getAdminProfile();

                if (!active) return;

                setAdminProfile(profile);
                setIsProfileReady(true);
            } catch {
                if (!active) return;

                clearAdminSession();
                navigate("/admin/login", { replace: true });
            }
        }

        loadAdminProfile();

        return () => {
            active = false;
        };
    }, [navigate]);

    const handleLogout = async () => {
        const result = await Swal.fire({
            icon: "question",
            title: "Logout?",
            text: "Anda akan keluar dari dashboard admin.",
            showCancelButton: true,
            confirmButtonText: "Ya, Logout",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
        });

        if (!result.isConfirmed) return;

        await logoutAdmin();

        await Swal.fire({
            icon: "success",
            title: "Logout berhasil",
            confirmButtonColor: "#4f46e5",
        });

        navigate("/admin/login", { replace: true });
    };

    const handleEditProfile = () => {
        Swal.fire({
            icon: "info",
            title: "Edit Profil",
            text: "Fitur edit profil admin belum dibuat.",
            confirmButtonColor: "#4f46e5",
        });
    };

    if (!isProfileReady) {
        return (
            <div className="min-h-screen bg-neutral-50" />
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                menus={adminMenus}
            />

            <div className="flex min-h-screen flex-col lg:pl-72">
                <AdminHeader
                    title={activeTitle}
                    admin={adminProfile}
                    onToggleSidebar={() => setIsSidebarOpen(true)}
                    onLogout={handleLogout}
                    onEditProfile={handleEditProfile}
                />

                <main className="flex-1 overflow-y-auto p-5 lg:p-8">
                    <div className="min-h-[calc(100vh-7rem)] rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}