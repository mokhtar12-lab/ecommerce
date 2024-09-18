import Contact from "../components/shared/contact/Contact";
import Footer from "../components/shared/Footer/Footer";
import Header from "../components/shared/Header_Title/Header";
import Nav_Bar from "../components/shared/Navigation/Navigation";

export default function ContactUs() {
    return (
        <>
            <div className="container">
                <Header />
                <Nav_Bar />
            </div>
            <div className="container">
                <Contact />
            </div>
            <Footer />
        </>
    )
}
