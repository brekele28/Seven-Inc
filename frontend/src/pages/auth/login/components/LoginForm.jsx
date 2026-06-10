import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { loginAdmin } from "../../../../api/auth/AuthApi";

export default function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            await loginAdmin(form);

            await Swal.fire({
                icon: "success",
                title: "Login berhasil",
                text: "Selamat datang di dashboard admin.",
                confirmButtonColor: "#4f46e5",
            });

            navigate("/admin/dashboard");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login gagal",
                text: error.message || "Email atau password salah.",
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-2xl font-black text-white">Login Admin</h2>
                <p className="mt-2 text-sm text-slate-300">
                    Masukkan email dan password admin.
                </p>
            </div>

            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">
                    Email
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="admin@email.com"
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        required
                    />
                </div>
            </label>

            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">
                    Password
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <Lock className="h-5 w-5 text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="shrink-0 text-slate-400 transition hover:text-slate-200 focus:outline-none"
                        aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </label>

            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
                <LogIn className="h-5 w-5" />
                {isLoading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center text-sm text-slate-300">
                Belum punya akun admin?{" "}
                <Link to="/admin/register" className="font-bold text-indigo-300 hover:text-indigo-200">
                    Daftar
                </Link>
            </p>
        </form>
    );
}