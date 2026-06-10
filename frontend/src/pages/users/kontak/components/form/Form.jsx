import ErrorText from "../../../../../features/kontak/feedback/ErrorText";

import FieldLabel from "./FieldLabel";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

export default function Form({
    values,
    errors,
    isSubmitting,
    subjectOptions,
    onChange,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel required>Nama Lengkap</FieldLabel>
                    <Input
                        name="fullName"
                        value={values.fullName}
                        onChange={(e) => onChange("fullName", e.target.value)}
                        placeholder="Contoh: John Doe"
                        autoComplete="name"
                        error={errors.fullName}
                    />
                    <ErrorText>{errors.fullName}</ErrorText>
                </div>

                <div>
                    <FieldLabel required>Email</FieldLabel>
                    <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="Contoh: johndoe@gmail.com"
                        autoComplete="email"
                        error={errors.email}
                    />
                    <ErrorText>{errors.email}</ErrorText>
                </div>

                <div>
                    <FieldLabel required>Nomor Telepon</FieldLabel>
                    <Input
                        name="phone"
                        value={values.phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        placeholder="Contoh: 081234567891"
                        autoComplete="tel"
                        inputMode="tel"
                        error={errors.phone}
                    />
                    <ErrorText>{errors.phone}</ErrorText>
                </div>

                <div>
                    <FieldLabel required>Subjek</FieldLabel>
                    <Select
                        name="subject"
                        value={values.subject}
                        onChange={(e) => onChange("subject", e.target.value)}
                        error={errors.subject}
                    >
                        {(subjectOptions || []).map((opt) => (
                            <option key={opt.value || opt.label} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Select>
                    <ErrorText>{errors.subject}</ErrorText>
                </div>

                <div className="md:col-span-2">
                    <FieldLabel required>Pesan Anda</FieldLabel>
                    <Textarea
                        name="message"
                        value={values.message}
                        onChange={(e) => onChange("message", e.target.value)}
                        placeholder="Pesan Anda"
                        error={errors.message}
                    />
                    <ErrorText>{errors.message}</ErrorText>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={[
                        "min-w-[280px] sm:min-w-[340px]",
                        "rounded-full",
                        "bg-white text-neutral-900",
                        "border border-neutral-200",
                        "px-8 py-3 text-[13px] font-semibold",
                        "shadow-[0_10px_26px_rgba(0,0,0,0.10)]",
                        "transition",
                        "hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]",
                        "active:scale-[0.99]",
                        isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                    ].join(" ")}
                >
                    {isSubmitting ? "Memproses..." : "Kirim Pesan"}
                </button>
            </div>
        </form>
    );
}