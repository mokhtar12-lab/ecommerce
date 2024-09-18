import "./productStyle.css"

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks"
import { useEffect, useState } from "react"
import { GetSomeProductThunk } from "../../../store/ProductsSlice/ProductsSlice"
import { addToCart } from "../../../store/cart/CartSlice"
import { Spinner } from "react-bootstrap"


export default function SomeProductsComponent() {
    const dispach = useAppDispatch()
    const [isBtnClicked, setIsBtnClicked] = useState(0)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)

    useEffect( () =>{
        if(!isBtnClicked) {
            return;
        }
        setIsBtnDisabled(true)

        const debounce = setTimeout( ()=>{
            setIsBtnDisabled(false)
        }, 500 )
        return ()=> clearTimeout(debounce)
    },[isBtnClicked] )




    useEffect( ()=>{
        dispach(GetSomeProductThunk())
    },[dispach] )
    const {records} = useAppSelector(state => state.Products)

    const dispachCart = useAppDispatch()


interface IProduct{
    id:number, title:string, price:number, category:string, img:string
}

    const addToCArtHandler = (pro:IProduct) =>{
        dispachCart(addToCart(pro))
        setIsBtnClicked((prev)=> prev + 1)
    }



    return (
        <div className="containe">
            <div className="row">
                {
                    records.map(product=> {
                        return(
                            <div className="col" key={product.id}>
                                <div className="card">
                                    <img src={product.img} alt="product" />
                                    <h4 title={product.title}>{product.title}</h4>
                                    <p>Price: {product.price}$ </p>
                                    <button onClick={ ()=> addToCArtHandler(product) } className="btn" disabled={isBtnDisabled}>
                                        {isBtnDisabled ? <> <Spinner animation="border" size="sm"  /> Loading... </>: "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}