import "./CategoryStyle.css"
import { CategoriesCleanUp, GetAllCategoriesThunk } from "../../../store/categoriesSlice/categoriesSlice" 
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Categories() {
    const dispatch = useAppDispatch()
    const {records} = useAppSelector(state => state.Category)

    useEffect( ()=>{
        dispatch(GetAllCategoriesThunk())

        return () =>{
            dispatch(CategoriesCleanUp())
        }

    },[dispatch] )

    return (
        <div className="container">
            <div className="categories">
                <Link to={"/products/all"} className="btn category">All</Link>
                {
                    records.map(category =>{
                        return (
                            <Link to={`/products/category/${category.category}`} key={category.id} className="btn category">{category.category}</Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
