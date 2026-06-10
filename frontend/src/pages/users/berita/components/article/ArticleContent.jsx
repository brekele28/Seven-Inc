import ArticleHeader from "./ArticleHeader";
import ArticleImage from "./ArticleImage";
import ArticleRelatedLink from "./ArticleRelatedLink";
import ArticleSection from "./ArticleSection";
import ArticleBackLink from "./ArticleBackLink";

const DUMMY = {
    title: "Integritas dan Disiplin, Dua Pilar Penting Pembentukan SDM Berkualitas di Seven INC.",
    date: "28 Jul 2025",
    imageSrc: "/assets/image/Berita/news4.png",
};

export default function ArticleContent({ children, data, backTo }) {
    const payload = {
        title: data?.title || DUMMY.title,
        date: data?.date || DUMMY.date,
        imageSrc: data?.imageSrc || DUMMY.imageSrc,
    };

    const backTarget = backTo || "/berita?page=1";

    // Jika nanti kamu mau inject konten dinamis, pakai `children`.
    if (children) {
        return (
            <article aria-labelledby="article-title" className="bg-white py-12 md:py-14">
                <div className="max-w-245 mx-auto px-0">{children}</div>
            </article>
        );
    }

    return (
        <article aria-labelledby="article-title" className="bg-white py-12 md:py-4">
            <div className="max-w-245 mx-auto px-0">
                <ArticleHeader title={payload.title} date={payload.date} />

                <ArticleImage src={payload.imageSrc} alt="Gambar utama berita Seven INC" />

                {/* Lead paragraph */}
                <p className="mt-10 text-[13px] md:text-[14px] leading-[2.05] text-neutral-700">
                    <strong className="font-extrabold text-neutral-900">Jakarta (LoremPost)</strong>{" "}
                    — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus ligula non
                    felis tincidunt, et hendrerit nunc convallis. Quisque ut placerat elit. Menurut
                    pengamat tipografi, penggunaan struktur teks seperti ini sangat membantu dalam mengisi
                    ruang visual tanpa gangguan makna. “Donec accumsan sagittis tincidunt. Nullam ante
                    arcu, auctor eget vulputate eu, cursus id leo,” ujarnya saat ditemui di sela kegiatan
                    pameran desain. Ia menambahkan bahwa kenyamanan dalam membaca menjadi perhatian penting,
                    “In sollicitudin pretium erat porttitor suscipit. Sed volutpat sem sit amet sem cursus
                    tincidunt. Ut urna magna, ornare in consectetur at, congue vel risus,” tambahnya.
                </p>

                <ArticleRelatedLink
                    text="Lorem Ipsum Diumumkan Sebagai Standar Tipografi Global"
                    href="#"
                />

                <ArticleSection
                    heading="Kondisi Terkini dan Tanggapan Peserta"
                    content='Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam turpis metus, dictum ut nisi non, pellentesque porta purus. Proin eget posuere leo. Nam aliquet finibus ac ante vitae viverra. Integer pretium mauris non metus pulvinar aliquet. Nam sit amet iaculis metus. Vivamus non lorem odio. Nam ornare interdum arcu, et sagittis purus placerat et. "Struktur teks ini memberikan kenyamanan saat mendesain layout cetak maupun digital," ungkap seorang desainer editorial. Donec blandit gravida quam, non fermentum nisi rutrum in. Proin cursus dignissim magna, quis mollis odio congue ac. Etiam porta justo nec mauris tristique, euismod auctor ante sagittis. Cras quis ligula id est faucibus tincidunt in at dolor.'
                />

                <ArticleSection
                    heading="Perspektif Editorial dan Analisis Format"
                    content='Ut metus diam, varius a leo eget, ultricies accumsan ligula. Maecenas tempor fermentum lobortis. Nam fermentum tortor non neque congue tempus. Mauris feugiat leo eros, eu tincidunt libero consequat a. Ut aliquam nisi leo, sit amet mollis nibh aliquam non. "Kelebihan utama dari lorem ipsum adalah ke-netralan kata yang tidak memiliki makna sebenarnya," ujar editor tipografi. Cras consequat libero sed mollis elementum. Mauris elementum massa leo, non ultrices risus efficitur nec.'
                />

                <ArticleSection
                    heading="Respons Positif dan Dukungan Teknis"
                    content='Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent fermentum arcu ac porttitor imperdiet. Nulla blandit tortor quis iaculis commodo. Quisque rutrum massa risus, ac pellentesque massa auctor eu. Nunc dictum pellentesque nibh, Curabitur at quam nisl. Aliquam erat volutpat. "Saya menggunakan Lorem Ipsum hampir setiap hari untuk menemodemokan desain halaman," kata salah satu peserta konferensi desain. Vestibulum non bibendum nunc. Proin sagittis sed risus iaculis eleifend. Etiam hendrerit elit et magna feugiat facilisis.'
                />

                <ArticleSection
                    heading="Penutupan Acara dan Rencana Lanjutan"
                    content='Sed placerat, sapien et fermentum finibus, nibh tellus feugiat odio, ac semper eros dui non odio. Donec dui dui, varius in neque quis, congue sollicitudin dui. Phasellus gravida neque eget leo aliquet, sed sagittis tortor feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed purus orci, ornare at dui at, feugiat placerat magna. Pellentesque pulvinar maximus pulvinar. "Penggunaan teks dummy seperti ini sudah menjadi bagian dari tradisi desain modern," tutur penyelenggara acara. Sed faucibus, sem sed fringilla feugiat, metus ligula imperdiet massa, eget tincidunt nibh ipsum in augue. Donec fringilla orci eget dolor pulvinar maximus. Sed lacinia eros eu ante fringilla, ut molestie orci porttitor. Quisque magna diam, semper at tempus ac, faucibus ut lectus. Quisque sem leo, dignissim vel mi in, rutrum rhoncus ipsum. Suspendisse a turpis dictum, vehicula enim quis, condimentum lectus. Pellentesque accumsan non magna vel sagittis.'
                />

                <ArticleBackLink to={backTarget} />
            </div>
        </article>
    );
}