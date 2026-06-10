import { Outlet } from "react-router";
import Navbar from "../../components/user/layout/UserHeader/Navbar";
import Footer from "../../components/user/layout/UserFooter/Footer";
import Container from "../../components/user/ui/Container/Container";

export default function UserLayout() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            {/* Header */}
            <Navbar />

            {/* Spacer untuk mengganti tinggi Navbar fixed */}
            <div className="h-20" />

            {/* Body */}
            <main className="flex-1 py-10">
                <Container>
                    <Outlet />
                </Container>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}