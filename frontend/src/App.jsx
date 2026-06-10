import { RouterProvider, createBrowserRouter } from "react-router";
import { userRoutes } from "./routes/user/userRoutes";
import { adminRoutes } from "./routes/admin/adminRoutes";

const router = createBrowserRouter([
    userRoutes,
    adminRoutes,
]);

export default function App() {
    return <RouterProvider router={router} />;
}