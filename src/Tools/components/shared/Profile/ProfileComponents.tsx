import { useAppSelector } from "../../../hooks/reduxHooks"


import "./profileStyle.css"
import avatar from "../../../../assets/avatar.jpg"
import { NavLink } from "react-router-dom"

    


export default function ProfileComponents() {

    const {user} = useAppSelector( (state)=> state.auth )


    const {items} = useAppSelector(state => state.cart)
    const totalQuantaty = Object.values(items).reduce((a, b) => {return a + b}, 0)



    return (
        <>
            <div className="body-profile">
                <div className="part-of-avatar-info">
                    <div className="img-avatar">
                        <img src={avatar} alt="avatar" />
                    </div>
                    <div className="info-profile">
                        <p> Name: <span>{user?.fullname}</span> </p>
                        <p> Email: <span>{user?.email}</span> </p>
                        <p> Ag: <span>{user?.age}</span> </p>
                    </div>
                </div>
                <hr />
                <div className="part-of-btn-products">
                    <p>Your Products: <span> <NavLink to={"/CartPage"} className="btn">Your Cart {totalQuantaty}</NavLink> </span></p>
                    <NavLink to={""} className="btn">Setting</NavLink>
                </div>
            </div>
        </>
    )
}
