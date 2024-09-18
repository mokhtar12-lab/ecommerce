import { Link } from "react-router-dom";
import SomeProductsComponent from "../components/eCommerce/Products/SomeProducts";
import Header from "../components/shared/Header_Title/Header";
import Nav_Bar from "../components/shared/Navigation/Navigation";


import About from "../components/shared/about/About";
import Contact from "../components/shared/contact/Contact";
import Footer from "../components/shared/Footer/Footer";

import "../style/homeStyle.css"
export default function Home() {
    return (
        <>
            <div className="landing">
                <div className="container">
                    <Header />
                    <Nav_Bar />
                </div>
                <div className="info-landing">
                    <h1>Welcome to Shop eCommerce</h1>
                    <p>Discover the latest trends and products from our wide range</p>
                    <Link to={"/products"} className="btn btn-primary">Shop Now</Link>
                </div>
            </div>

            <div className="container">
                <About />
            </div>

            <hr />

            <div className="container">
            <h1 className="title-contact"> Products </h1>
                <SomeProductsComponent />
                <div className="butt">
                    <Link to={"/products"} className="btn BTN-more">More</Link>
                </div>
            </div>

            <hr />

            <div className="container">
                <Contact />
            </div>
            <Footer />
        </>
    )
}
