import AboutAction from "./AboutAction";
import AboutHeader from "./AboutHeader";

export default function AboutBody({ onReadMore }) {
    return (
        <div>
            <AboutHeader />

            <p className="mt-4 text-neutral-600 leading-relaxed">
                Seven Inc. berasal dari kata Seven, yang dalam bahasa Jawa berarti “Pitu”,
                yang juga memiliki makna “Pitlungan” atau Pertolongan. Nama ini dipilih
                sebagai wujud komitmen perusahaan untuk senantiasa memberikan dukungan
                dan manfaat nyata bagi masyarakat melalui berbagai layanan yang ditawarkan.
            </p>

            <AboutAction onClick={onReadMore} />
        </div>
    );
}