import { Navigate, Outlet } from "react-router";
import { getRegisterTicket } from "../../api/auth/AuthStorage";

export default function PinProtectedRoute() {
    const ticket = getRegisterTicket();

    if (!ticket) {
        return <Navigate to="/admin/verify-pin" replace />;
    }

    return <Outlet />;
}