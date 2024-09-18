import { createAsyncThunk } from "@reduxjs/toolkit";
import "axios";
import axios from "axios";

const GetAllCategoriesThunk = createAsyncThunk("categories/GetAllCategoriesThunk", async(_,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const response = await axios.get("http://localhost:3000/categories")
        return response.data
        
    } catch (error) {
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        }else{
            return rejectWithValue("An unexpected error")
        }
    }
})

export default GetAllCategoriesThunk;