import FieldLabel from "../base/FieldLabel";

export default function Name({ kontak }) {
    return (
        <div>
            <FieldLabel htmlFor="contact_name" required>
                Nama Lengkap
            </FieldLabel>
            <input
                id="contact_name"
                name="name"
                type="text"
                placeholder="Contoh: John Doe"
                required
                value={kontak.values.fullName}
                onChange={(e) => kontak.setField("fullName", e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200"
            />
        </div>
    );
}