import AdminLayout from "../../layouts/admin/AdminLayout";
import AdminProtectedRoute from "./AdminProtectedRoute";
import PinProtectedRoute from "./PinProtectedRoute";
import AdminGuestRoute from "./AdminGuestRoute";

import VerifyPin from "../../pages/auth/pin/VerifyPin";
import Login from "../../pages/auth/login/Login";
import Register from "../../pages/auth/register/Register";

import AdminDashboard from "../../pages/admins/dashboard/AdminDashboard";
import AdminNavbar from "../../pages/admins/navbar/AdminNavbar";
import AdminNews from "../../pages/admins/news/AdminNews";
import AdminBusiness from "../../pages/admins/business/AdminBusiness";
import AdminInternship from "../../pages/admins/internship/AdminInternship";
import AdminFooter from "../../pages/admins/footer/AdminFooter";
import AdminAbout from "../../pages/admins/about/AdminAbout";

import AdminPelamar from "../../pages/admins/erecruitment/pelamar/AdminPelamar";
import AdminLowongan from "../../pages/admins/erecruitment/lowongan/AdminLowongan";
import AdminDataArchiving from "../../pages/admins/erecruitment/dataarchiving/AdminDataArchiving";
import AdminTampilan from "../../pages/admins/erecruitment/tampilan/AdminTampilan";

export const adminRoutes = {
    path: "/admin",
    children: [
        {
            element: <AdminGuestRoute />,
            children: [
                {
                    path: "verify-pin",
                    element: <VerifyPin />,
                },
                {
                    element: <PinProtectedRoute />,
                    children: [
                        {
                            path: "login",
                            element: <Login />,
                        },
                        {
                            path: "register",
                            element: <Register />,
                        },
                    ],
                },
            ],
        },
        {
            element: <AdminProtectedRoute />,
            children: [
                {
                    element: <AdminLayout />,
                    children: [
                        {
                            index: true,
                            element: <AdminDashboard />,
                        },
                        {
                            path: "dashboard",
                            element: <AdminDashboard />,
                        },
                        {
                            path: "navbar",
                            element: <AdminNavbar />,
                        },
                        {
                            path: "news",
                            element: <AdminNews />,
                        },
                        {
                            path: "business",
                            element: <AdminBusiness />,
                        },
                        {
                            path: "internship",
                            element: <AdminInternship />,
                        },
                        {
                            path: "e-recruitment/pelamar",
                            element: <AdminPelamar />,
                        },
                        {
                            path: "e-recruitment/lowongan",
                            element: <AdminLowongan />,
                        },
                        {
                            path: "e-recruitment/data-archiving",
                            element: <AdminDataArchiving />,
                        },
                        {
                            path: "e-recruitment/tampilan",
                            element: <AdminTampilan />,
                        },
                        {
                            path: "footer",
                            element: <AdminFooter />,
                        },
                        {
                            path: "about",
                            element: <AdminAbout />,
                        },
                    ],
                },
            ],
        },
    ],
};