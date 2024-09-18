import "bootstrap/dist/css/bootstrap.css"

import "./main_Style.css";
// import Nav_Bar from "../../components/shared/Navigation/Navigation";
// import Header from "../../components/shared/Header_Title/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../../components/shared/Footer/Footer";


function MainLayout() {
    return(
        <>
            <div className="Container">
                <div> <Outlet /> </div>
            </div>
        </>
    )
}

export default MainLayout;