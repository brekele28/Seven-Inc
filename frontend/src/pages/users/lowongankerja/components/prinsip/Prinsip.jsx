import PrinsipBase from "../../../tentangkami/components/prinsip/Prinsip";
import { getPrinciples } from "../../../../../services/user/tentangkami/tentangkamiRepository";

export default function Prinsip() {
    const principles = getPrinciples();

    return (
        <section aria-label="Core Value Perusahaan" className="py-2">
            <PrinsipBase principles={principles} />
        </section>
    );
}