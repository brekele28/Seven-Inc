import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ShieldCheck } from "lucide-react";
import { verifyAdminPin } from "../../../../api/auth/AuthApi";

const PIN_LENGTH = 6;

export default function PinInput() {
    const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const focusInput = (index) => {
        inputRefs.current[index]?.focus();
    };

    const handleChange = (index, value) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        const nextPin = [...pin];
        nextPin[index] = digit;
        setPin(nextPin);

        if (digit && index < PIN_LENGTH - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            focusInput(index - 1);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, PIN_LENGTH);

        if (!pasted) return;

        const nextPin = Array(PIN_LENGTH).fill("");

        pasted.split("").forEach((digit, index) => {
            nextPin[index] = digit;
        });

        setPin(nextPin);
        focusInput(Math.min(pasted.length, PIN_LENGTH - 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalPin = pin.join("");

        if (finalPin.length !== PIN_LENGTH) {
            Swal.fire({
                icon: "warning",
                title: "PIN belum lengkap",
                text: "Masukkan 6 digit PIN terlebih dahulu.",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        try {
            setIsLoading(true);

            await verifyAdminPin(finalPin);

            await Swal.fire({
                icon: "success",
                title: "PIN benar",
                text: "Silakan login atau daftar admin.",
                confirmButtonColor: "#4f46e5",
            });

            navigate("/admin/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Verifikasi gagal",
                text: error.message || "PIN salah atau sudah diblokir sementara.",
                confirmButtonColor: "#4f46e5",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl">
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                {pin.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        aria-label={`Digit PIN ke-${index + 1}`}
                        className="h-14 w-11 rounded-2xl border border-white/10 bg-white/10 text-center text-xl font-black text-white outline-none transition focus:border-indigo-300 focus:bg-white/15 focus:ring-4 focus:ring-indigo-500/20 sm:h-16 sm:w-14"
                    />
                ))}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
                <ShieldCheck className="h-5 w-5" />
                {isLoading ? "Memverifikasi..." : "Verifikasi PIN"}
            </button>
        </form>
    );
}