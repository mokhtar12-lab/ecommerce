import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header_Title/Header";


export default function Payment() {
    return (
        <div className="container">
            <Header />
            <Outlet />
        </div>
    )
}
