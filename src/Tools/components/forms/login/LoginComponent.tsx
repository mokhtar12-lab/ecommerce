import { Navigate, useSearchParams } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {ZodLogInSchema} from "../../../validations/loginSchema"

import { Link } from "react-router-dom"
import Header from "../../shared/Header_Title/Header"
import "./loginFormStyle.css"
import CheckEmailValidation from "../../../hooks/checkEmailValidation";
import CheckPasswordValidation from "../../../hooks/checkPasswordValidation";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { loginThunk, resetUI } from "../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

type TLogInForm = z.infer<typeof ZodLogInSchema>

export default function LoginComponent() {
    const [searchParams] = useSearchParams()
    const {error, loading, accessToken} =useAppSelector(state => state.auth)
    const navigate = useNavigate()

const {register, handleSubmit, trigger, getFieldState, formState:{errors}} = useForm<TLogInForm>({
    mode: 'onBlur',
    resolver: zodResolver(ZodLogInSchema)
})

const dispatchLogIn = useAppDispatch() 

const LogInSubmit: SubmitHandler<TLogInForm> = (data) => {
    const {email, password} = data
    dispatchLogIn(loginThunk({email, password})).unwrap().then( ()=>{navigate("/")} )
}

useEffect( () => {
    return () =>{
        dispatchLogIn(resetUI())
    }
},[dispatchLogIn] )


if(accessToken) {
    return <Navigate to={"/"} />
}

// Validation Email
const {EmailAvailabilityStatus, EnterEmail, CheckEmailAvailability, resetEmailValidation} = CheckEmailValidation()
const EmailonBlureHandler = async (el: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email")
    const value = el.target.value
    const {isDirty, invalid} = getFieldState("email")
    if(isDirty && !invalid && EnterEmail !== value) {
        CheckEmailAvailability(value)
    }
    if(isDirty && !invalid && EnterEmail) {
        resetEmailValidation()
    }
}
const StateValidEmail = () => {
    if(EmailAvailabilityStatus === "checking") {
        if(EmailAvailabilityStatus) {
            return <> <p style={{color: "gray" ,fontSize: "13px"}} >Please Wait We Checking The Email Validation</p> </>
        }else {
            return
        }
    }
    else if(EmailAvailabilityStatus === "Available" ) {
        if(EmailAvailabilityStatus) {
            return <> <p style={{color: 'red' ,fontSize: "13px"}}>Email is Not Find Please Enter Currect Email </p> </>
        }else {
            return
        }
        
    }
    else if(EmailAvailabilityStatus === "Not Available") {
        if(EmailAvailabilityStatus) {
            return <> <p style={{color: 'green' ,fontSize: "13px"}}>Email is Currect</p> </>
        }else {
            return
        }
    }
    else if(EmailAvailabilityStatus === "failed") {
        return <> <p style={{color: "red" ,fontSize: "13px"}}>Error form The Server</p> </>
    }
    else {
        return
    }
}
// Validation Password
const { EnterPassword, CheckPasswordAvailability, resetPasswordValidation} = CheckPasswordValidation()
const PasswordonBlureHandler = async (el: React.FocusEvent<HTMLInputElement>) => {
    await trigger("password")
    const value = el.target.value
    const {isDirty, invalid} = getFieldState("password")
    if(isDirty && !invalid && EnterPassword !== value) {
      CheckPasswordAvailability(value)
    }
    if(isDirty && !invalid && EnterPassword) {
      resetPasswordValidation()
    }
}

const disableCheck = () =>{
    if(EmailAvailabilityStatus === "checking") {
        return true
    }else {
        if(EmailAvailabilityStatus === "Available") {
            return true
        }else{
            return false
        }
    }
}

return (
    <div >
        <Header />
        <h1 className="title-form">Login</h1>

        <div className="form-login">
        <form onSubmit={handleSubmit(LogInSubmit)}>
            {searchParams.get("message") === "account_created" && <p style={{textAlign: "center" , color: "green" ,fontSize: "13px"}}>Account is Created, Please Log in</p> }
            
            <input type="text" placeholder="Email" className="field" {...register("email")} autoFocus onBlur={EmailonBlureHandler}></input>
            <p>{errors.email?.message}</p>
            {StateValidEmail()}
            <input type="password" placeholder="Password" className="field" {...register("password")} onBlur={PasswordonBlureHandler}></input>
            <p>{errors.password?.message}</p>

            <button className="submit btn" style={{border:"solid 1px #000"}} disabled={disableCheck()}>
                {loading === "pending" ? <> <Spinner animation="border" size="sm"></Spinner>Loading...  </>: "LogIn"}
            </button>

            {error && <p style={{color: "red" ,fontSize: "13px"}}>{error}</p>}
        </form>
        <p className="BTN-signup"> <Link to={"/SignUp"}>SignUp</Link> </p>
        </div>
    </div>
)
}
