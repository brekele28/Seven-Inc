import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Business from "./components/business/Business";
import Banner from "./components/banner/Banner";
import News from "./components/news/News";
import Contact from "./components/contact/base/Contact";

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Business />
            <Banner />
            <News />
            <Contact />
        </>
    );
}