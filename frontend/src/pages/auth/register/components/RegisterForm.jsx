import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from "lucide-react";
import { registerAdmin } from "../../../../api/auth/AuthApi";
import { getRegisterTicket } from "../../../../api/auth/AuthStorage";

export default function RegisterForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerTicket = getRegisterTicket();

        if (!registerTicket) {
            Swal.fire({
                icon: "warning",
                title: "Akses kedaluwarsa",
                text: "Silakan verifikasi PIN ulang.",
                confirmButtonColor: "#4f46e5",
            });

            navigate("/admin/verify-pin");
            return;
        }

        try {
            setIsLoading(true);

            await registerAdmin({
                register_ticket: registerTicket,
                name: form.name,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
            });

            await Swal.fire({
                icon: "success",
                title: "Register berhasil",
                text: "Silakan login menggunakan akun admin baru.",
                confirmButtonColor: "#4f46e5",
            });

            navigate("/admin/login");
        } catch (error) {
            const firstError = error?.errors
                ? Object.values(error.errors).flat()?.[0]
                : null;

            Swal.fire({
                icon: "error",
                title: "Register gagal",
                text: firstError || error.message || "Periksa kembali data register.",
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">
                    Nama
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nama admin"
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        required
                    />
                </div>
            </label>

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
                        placeholder="Minimal 8 karakter"
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

            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">
                    Konfirmasi Password
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <Lock className="h-5 w-5 text-slate-400" />
                    <input
                        type={showPasswordConfirmation ? "text" : "password"}
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        placeholder="Ulangi password"
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                        className="shrink-0 text-slate-400 transition hover:text-slate-200 focus:outline-none"
                        aria-label={
                            showPasswordConfirmation
                                ? "Sembunyikan konfirmasi password"
                                : "Lihat konfirmasi password"
                        }
                    >
                        {showPasswordConfirmation ? (
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
                <UserPlus className="h-5 w-5" />
                {isLoading ? "Mendaftarkan..." : "Daftar Admin"}
            </button>

            <p className="text-center text-sm text-slate-300">
                Sudah punya akun?{" "}
                <Link to="/admin/login" className="font-bold text-indigo-300 hover:text-indigo-200">
                    Login
                </Link>
            </p>
        </form>
    );
}