import AboutPrinsip from "../../../tentangkami/components/prinsip/Prinsip";
import { getPrinciples } from "../../../../../services/user/tentangkami/tentangkamiRepository";

export default function Prinsip() {
    const principles = getPrinciples();
    return (
        <section className="bg-white py-10 md:py-12">
            <AboutPrinsip principles={principles} />
        </section>
    );
}