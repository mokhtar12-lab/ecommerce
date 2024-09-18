import { createSlice } from "@reduxjs/toolkit";
import getProductsWithItems from "./Thunk/getProductsWithItems"

import { logOut } from "../auth/authSlice";


interface ICartState {
    items: { [key: number]: number },
    productFullInfo: {   
        id:number,
        title:string, 
        price:number, 
        category:string, 
        quantity: number,
        img:string}[],
    loading: "idle" | "pending" | "succeeded" | "failed",
    error : null | string
}

const initialState:ICartState ={
    items: {},
    productFullInfo: [],
    loading: "idle",
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload.id;
            if(state.items[id]) {
                state.items[id]++
            }else{
                state.items[id] = 1;
            }
        },
        removeItem: (state, action) =>{
            console.log(action.payload);
            
            delete state.items[action.payload];
            
            state.productFullInfo = state.productFullInfo.filter( (el)=> el.id !== action.payload )
        },
        productFullInfoCleanUp: (state) =>{
            state.productFullInfo = [];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getProductsWithItems.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        })

        builder.addCase(getProductsWithItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productFullInfo = action.payload
        })

        builder.addCase(getProductsWithItems.rejected, (state)=>{
            state.loading = "failed";
            state.error = "Not Found"
        })

        builder.addCase(logOut, (state)=>{
            state.items= []
            state.productFullInfo= []
        })
    }
})

export {getProductsWithItems}
export const { addToCart, removeItem, productFullInfoCleanUp } = cartSlice.actions;
export default cartSlice.reducer