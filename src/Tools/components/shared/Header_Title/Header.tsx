import { Link } from "react-router-dom";
import "./headerStyle.css"
import Cart from "../Cart/Cart";


function Header() {
    return(
        <>
            <header className="">
                <div className="text-center title ">
                    <Link to={"/"}> <span>Shop</span> eCommerce </Link>
                    <Cart />
                </div>
                <hr className="line" />
            </header>
        </>
    )
}

export default Header;