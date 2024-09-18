import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

const getProductsWithItems = createAsyncThunk("cart/getProductsWithItems", async(_, thunkAPI)=>{
    const {rejectWithValue, fulfillWithValue ,getState} = thunkAPI

    const {cart} = getState() as RootState
    const itemWithID = Object.keys(cart.items)

    if(!itemWithID.length) {
        return fulfillWithValue([])
    }

    try {
        const concatinationItemsURL = itemWithID.map( (el) => `id=${el}`).join("&")
        const reponse = await axios.get(`http://localhost:3000/products?${concatinationItemsURL}`)
        return reponse.data
        } 
    catch (error) {
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        }else {
            return rejectWithValue("An unexpected error")
        }
    }
})

export default getProductsWithItems;