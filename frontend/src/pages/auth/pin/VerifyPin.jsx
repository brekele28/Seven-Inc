import PinHeader from "./components/PinHeader";
import PinInput from "./components/PinInput";

export default function VerifyPin() {
    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
                <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
                <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

                <section className="relative z-10 w-full rounded-3xl border border-white/10 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
                    <PinHeader />
                    <PinInput />
                </section>
            </div>
        </main>
    );
}