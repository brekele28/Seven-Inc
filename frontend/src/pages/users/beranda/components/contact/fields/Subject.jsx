import { ChevronDown } from "lucide-react";
import FieldLabel from "../base/FieldLabel";

export default function Subject({ kontak }) {
    return (
        <div>
            <FieldLabel htmlFor="contact_subject" required>
                Subjek
            </FieldLabel>

            <div className="relative mt-2">
                <select
                    id="contact_subject"
                    name="subject"
                    required
                    value={kontak.values.subject}
                    onChange={(e) => kontak.setField("subject", e.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-4 pr-12 text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200"
                >
                    {(kontak.subjectOptions || []).map((opt) => (
                        <option key={opt.value || opt.label} value={opt.value} disabled={opt.value === ""}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-700"
                />
            </div>
        </div>
    );
}