import { Link } from "react-router-dom"
import "./PersonalInfotStyle.css"


export default function PersonalInfoComponent() {
    return (
        <div className="container">
            <h1 className="title-form"> Personal Info </h1>
            <div className="form-Personal">
                <form>
                    <div className="name-email">
                        <input type="text" placeholder="Full Name" className="input" ></input>
                        <input type="Email" placeholder="Email" className="input" ></input>
                    </div>
                    <input type="text" placeholder="Phone Number" className="field" maxLength={11} ></input>
                    <input type="text" placeholder="Address" className="field"  maxLength={150}></input>
                    <input type="text" placeholder="Another Address (Optional)" className="field"  maxLength={150}></input>
                    <Link to={"/Payment/PaymentInfo"} type="submit" className="submit">payment</Link>
                </form>
            </div>
        </div>
    )
}
