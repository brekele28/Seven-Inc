import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { ensureValidAdminSession } from "../../api/auth/AuthApi";

export default function AdminProtectedRoute() {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let active = true;

        async function checkSession() {
            const isValid = await ensureValidAdminSession();

            if (!active) return;

            setStatus(isValid ? "authenticated" : "guest");
        }

        checkSession();

        return () => {
            active = false;
        };
    }, []);

    if (status === "checking") {
        return null;
    }

    if (status === "guest") {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}