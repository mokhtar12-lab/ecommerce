import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TData = {
    fullname: string,
    email: string,
    phonenumber: string,
    age: string,
    password: string,
}


const sigUpThunk = createAsyncThunk("auth/sigUpThunk", async (formdata:TData, ThunkAPI) =>{
    const {rejectWithValue} = ThunkAPI

    try {
        const res = await axios.post("http://localhost:3000/users", formdata)
        return res.data
    }catch(error) {
        console.error(error)
        return rejectWithValue('Failed to sign up')
    }


})

export default  sigUpThunk
