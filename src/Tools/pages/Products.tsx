import { Outlet } from "react-router-dom";
import Categories from "../components/eCommerce/Categories/Categories";
import Header from "../components/shared/Header_Title/Header";
import Nav_Bar from "../components/shared/Navigation/Navigation";


import "../style/productsPageStyle.css"
import Footer from "../components/shared/Footer/Footer";

export default function Products() {
    return (
        <>
            <div className="container">
                <Header />
                <Nav_Bar />
                <Categories />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
