import { createAsyncThunk } from "@reduxjs/toolkit";
import "axios";
import axios from "axios";

const GetAllProductsThunk = createAsyncThunk("products/GetAllProductsThunk", async(_,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const response = await axios.get("http://localhost:3000/products")
        return response.data
        
    } catch (error) {
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        }else{
            return rejectWithValue("An unexpected error")
        }
    }
})

export default GetAllProductsThunk;