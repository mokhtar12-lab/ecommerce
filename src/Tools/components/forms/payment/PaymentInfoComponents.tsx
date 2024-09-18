import { Link } from "react-router-dom"
import "./PaymentInfoStyle.css"
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect } from "react";
import { getProductsWithItems } from "../../../store/cart/CartSlice";


export default function PaymentInfoComponents() {
    const { productFullInfo } = useAppSelector(state => state.cart);
    const {items} = useAppSelector(state => state.cart)

    const dispatch = useAppDispatch()
    useEffect( ()=> {
        dispatch(getProductsWithItems())
    }, [dispatch] )

    const product = productFullInfo.map( (el) => ({
        ...el,
        quantity: items[el.id],
    }) );

    const totalPrice = product.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container">
            <h1 className="title-form"> Payment Info </h1>
            <div className="info-items">
                <h2 className="totla-form">Totla Price: {totalPrice} $</h2>
            </div>

            <div className="form-payment">
                <form>
                    <p className="card-name">Card holder full name</p>
                    <input type="text" placeholder="Enter Your Full Name" className="field"  ></input>
                    <input type="text" placeholder="Card Number(16)" className="field" maxLength={16}  ></input>
                    
                    <p className="expiry-date">Expiry Date / CVV</p>
                    <div className="date-cvv">
                        <input type="text" placeholder="01/24" className="input" ></input>
                        <input type="Email" placeholder="CVV" className="input" ></input>
                    </div>

                    <div className="buttons">
                        <Link to={"/Payment/PersonalInfoComponent"} type="submit" className="submit">Modify personal data</Link>
                        <input type="submit" className="btn submit" value="Payment Done"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}
