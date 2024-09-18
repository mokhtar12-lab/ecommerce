import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type TFormData = {
    email: string,
    password: string,
}

type TResponse = {
    accessToken: string
    user: {
        id: number,
        fullname: string,
        email: string,
        age: string,
        phonenumber: string,
    }

}

const loginThunk = createAsyncThunk("auth/loginThunk", async(formdata:TFormData, ThunkAPI) =>{
    const {rejectWithValue} = ThunkAPI

    try {
        const res = await axios.post<TResponse>("http://localhost:3000/login", formdata)
        return res.data
        
    } catch (error) {
        console.error(error)
        return rejectWithValue('Failed to sign up')
    }



})

export default loginThunk