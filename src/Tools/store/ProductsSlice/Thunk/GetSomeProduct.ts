import { createAsyncThunk } from "@reduxjs/toolkit";
import "axios";
import axios from "axios";

const GetSomeProductThunk = createAsyncThunk("products/GetSomeProductThunk", async(_,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const response = await axios.get("http://localhost:3000/products?_limit=4")
        return response.data
        
    } catch (error) {
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        }else{
            return rejectWithValue("An unexpected error")
        }
    }
})

export default GetSomeProductThunk;