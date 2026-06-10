import FieldLabel from "../base/FieldLabel";

export default function Phone({ kontak }) {
    return (
        <div>
            <FieldLabel htmlFor="contact_phone" required>
                Nomor Telepon
            </FieldLabel>
            <input
                id="contact_phone"
                name="phone"
                type="tel"
                placeholder="Contoh: 081234567891"
                required
                value={kontak.values.phone}
                onChange={(e) => kontak.setField("phone", e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200"
            />
        </div>
    );
}