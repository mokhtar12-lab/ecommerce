import About from "../components/shared/about/About";
import Footer from "../components/shared/Footer/Footer";
import Header from "../components/shared/Header_Title/Header";
import Nav_Bar from "../components/shared/Navigation/Navigation";

export default function AboutUs() {
    return (
        <>
            <div className="container">
                <Header />
                <Nav_Bar />
            </div>
            <div className="container">
                <About />
            </div>
            <Footer />
        </>
    )
}
