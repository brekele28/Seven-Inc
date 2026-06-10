import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { getAdminToken } from "../../api/auth/AuthStorage";
import { ensureValidAdminSession } from "../../api/auth/AuthApi";

export default function AdminGuestRoute() {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let active = true;

        async function checkSession() {
            const token = getAdminToken();

            if (!token) {
                if (active) setStatus("guest");
                return;
            }

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

    if (status === "authenticated") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
}