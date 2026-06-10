import FieldLabel from "../base/FieldLabel";

export default function Message({ kontak }) {
    return (
        <div className="md:col-span-2">
            <FieldLabel htmlFor="contact_message" required>
                Pesan Anda
            </FieldLabel>
            <textarea
                id="contact_message"
                name="message"
                placeholder="Pesan Anda"
                required
                value={kontak.values.message}
                onChange={(e) => kontak.setField("message", e.target.value)}
                className="mt-2 min-h-42.5 w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200"
            />
        </div>
    );
}