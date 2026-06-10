import RegisterHeader from "./components/RegisterHeader";
import RegisterForm from "./components/RegisterForm";
import RegisterTerms from "./components/RegisterTerms";

export default function Register() {
    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
                <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

                    <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <RegisterHeader />
                            <RegisterTerms />
                        </div>

                        <RegisterForm />
                    </div>
                </section>
            </div>
        </main>
    );
}