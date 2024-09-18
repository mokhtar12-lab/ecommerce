import { createSlice } from "@reduxjs/toolkit";

import GetAllCategoriesThunk from "./Thunk/GetAllCategoriesThunk"

interface ICategoriesState {
    records: {id:number, category:string, prefix:string}[],
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: string | null,
}

const initialState: ICategoriesState={
    records:[],
    loading: "idle",
    error: null,
}

const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        CategoriesCleanUp: (state) =>{
            state.records = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAllCategoriesThunk.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(GetAllCategoriesThunk.fulfilled, (state, action) => {
            state.records = action.payload;
            state.loading = "succeeded";
        });
        builder.addCase(GetAllCategoriesThunk.rejected, (state) => {
            state.loading = "failed";
            state.error = "Unexpected error"
        });
    }
})

export {GetAllCategoriesThunk} ;

export const {CategoriesCleanUp} = CategoriesSlice.actions
export default CategoriesSlice.reducer;