import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addToCart } from "../store/cart/CartSlice";
import { Spinner } from "react-bootstrap";


interface ICat {
    map(arg0: (cat: ICat) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id:number, 
    title:string, 
    price:number, 
    category:string, 
    img:string
}
export default function Category() {
    const [category, setCategory] = useState<ICat[]>([]);
    const { cat } = useParams();

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

    useEffect(() => {
        fetch(`http://localhost:3000/products?category=${cat}`)
        .then( (response) => response.json())
        .then( (data) => setCategory(data))
    },[cat] )

    const dispachCart = useAppDispatch()

    interface IProduct{
        id:number, title:string, price:number, category:string, img:string
    }

    const addToCArtHandler = (pro:IProduct) =>{
        dispachCart(addToCart(pro))
        setIsBtnClicked((prev)=> prev + 1)
    }

    return (
        <>
            <div className="containe">
                <div className="row">
                    {
                        category.map((cat: ICat) => {
                            return(
                                <div className="col" key={cat.id}>
                                    <div className="card">
                                        <img src={cat.img} alt="product" />
                                        <h4>{cat.title}</h4>
                                        <p>Price: {cat.price}$ </p>
                                        <button onClick={ ()=> addToCArtHandler(cat) } className="btn" disabled={isBtnDisabled}>
                                            {isBtnDisabled ? <> <Spinner animation="border" size="sm"  /> Loading... </>: "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        
        </>
    )
}
