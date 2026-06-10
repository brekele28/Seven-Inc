import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import LoginIllustration from "./components/LoginIllustration";

export default function Login() {
    return (
        <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
                <LoginIllustration />

                <section className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
                    <div className="hidden bg-white/5 p-10 lg:block">
                        <LoginHeader />
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="mb-8 lg:hidden">
                            <LoginHeader />
                        </div>

                        <LoginForm />
                    </div>
                </section>
            </div>
        </main>
    );
}