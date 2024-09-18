import { createSlice } from "@reduxjs/toolkit";

import GetAllProductsThunk from "./Thunk/GetAllProductsThunk"
import GetSomeProductThunk from "./Thunk/GetSomeProduct"


interface IProductsSlice {
    records: {id:number, title:string, price:number, category:string, img:string}[],
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: string | null,
}

const initialState: IProductsSlice={
    records:[],
    loading: "idle",
    error: null,
}

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetAllProductsThunk.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(GetAllProductsThunk.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        })
        builder.addCase(GetAllProductsThunk.rejected, (state)=>{
            state.loading = "failed";
            state.error = "Not Found"
        })

        builder.addCase(GetSomeProductThunk.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(GetSomeProductThunk.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        })
        builder.addCase(GetSomeProductThunk.rejected, (state)=>{
            state.loading = "failed";
            state.error = "Not Found"
        })
    }
})

export {GetAllProductsThunk, GetSomeProductThunk}

export default ProductsSlice.reducer;