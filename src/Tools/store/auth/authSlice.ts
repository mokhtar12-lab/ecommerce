import { createSlice } from "@reduxjs/toolkit";
import sigUpThunk from "./Thunk/sigUpThunk";
import loginThunk from "./Thunk/loginThunk";


interface IAuthState {
    user: {
        id: number,
        fullname: string,
        email: string,
        age: string,
        phonenumber: string,
    }| null;
    accessToken: string | null;
    loading : "idle" | "pending" | "succeeded" | "failed",
    error: string | null,
}


const initialState: IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,
}

const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: {
        resetUI :(state)=>{
            state.loading ="idle"
            state.error = null;
        },
        logOut: (state)=>{
            state.user = null
            state.accessToken = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(sigUpThunk.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        })

        builder.addCase(sigUpThunk.fulfilled, (state)=>{
            state.loading = "succeeded";
        })

        builder.addCase(sigUpThunk.rejected, (state)=>{
            state.loading = "failed";
            state.error = "Failed to sign up"
        })

        builder.addCase(loginThunk.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        })

        builder.addCase(loginThunk.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        })

        builder.addCase(loginThunk.rejected, (state)=>{
            state.loading = "failed";
            state.error = "Password is Not Currect"
        })
    }
})


export {sigUpThunk, loginThunk}
export const {resetUI, logOut} = authSlice.actions
export  default authSlice.reducer