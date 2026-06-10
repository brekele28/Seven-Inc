import FieldLabel from "../base/FieldLabel";

export default function Email({ kontak }) {
    return (
        <div>
            <FieldLabel htmlFor="contact_email" required>
                Email
            </FieldLabel>
            <input
                id="contact_email"
                name="email"
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
                required
                value={kontak.values.email}
                onChange={(e) => kontak.setField("email", e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200"
            />
        </div>
    );
}