import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { getProductsWithItems, productFullInfoCleanUp, removeItem } from "../store/cart/CartSlice"
import Header from "../components/shared/Header_Title/Header"
import Nav_Bar from "../components/shared/Navigation/Navigation"

import "../style/CartStyle.css"
import { Link } from "react-router-dom"

function CartPage() {
    const {items} = useAppSelector(state => state.cart)
    // const totalQuantaty = Object.values(items).reduce((a, b) => {return a + b}, 0)
    const { productFullInfo } = useAppSelector(state => state.cart);
    const {accessToken} = useAppSelector( state => state.auth )


    const dispatch = useAppDispatch()
    useEffect( ()=> {
        dispatch(getProductsWithItems())
        return () => { dispatch(productFullInfoCleanUp()) }
    }, [dispatch] )

    const product = productFullInfo.map( (el) => ({
        ...el,
        quantity: items[el.id],
    }) );

    const totalPrice = product.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    function DeleteItem(items:number) {
        dispatch(removeItem(items))
    }

    return(
        <>
            <div className="dashboard-cart container">
                <Header />
                <Nav_Bar />

                <div className="open-cart">                    
                    <div className="title-cart">
                        <h1 className="text-center">Your Cart</h1>
                        <hr />
                    </div>

                    <div className="products-cart">
                        <div className="row">
                            {
                                product.length ? product.map( (item) => {
                                    return(
                                        <>
                                            <div className="col" key={item.id}>
                                                <div className="product">
                                                    <img src={item.img} alt="photo" />
                                                    <div className="info-product">
                                                        <p>Name: {item.title}</p>
                                                        <p>Price: {item.price}$</p>
                                                        <p>quantity: {item.quantity}</p>
                                                    </div>
                                                    <button onClick={() => DeleteItem(item.id)} className="btn">Delete</button>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                } ): <p className="Message">There Are No Items</p>
                            }
                            <div>

                                {
                                    totalPrice ? <>
                                        <p className="totla-price">Total Price: {totalPrice}$</p>
                                        {
                                            accessToken ? <Link to={"/Payment"} className="btn"> Payment </Link>:
                                            <Link to={"/login"} className="btn"> Login </Link>
                                        }

                                    </> :null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;
