import Header from "../components/shared/Header_Title/Header";
import Nav_Bar from "../components/shared/Navigation/Navigation";
import ProfileComponents from "../components/shared/Profile/ProfileComponents";

export default function Profile() {
    return (
        <>
            <div className="container">
                <Header />
                <Nav_Bar />
            </div>
            <div className="container">
                <ProfileComponents />
            </div>
        </>
    )
}
