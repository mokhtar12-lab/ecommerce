import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams, Navigate } from "react-router-dom";
import "./signupFormStyle.css"
import Header from "../../shared/Header_Title/Header";
import { ZodSchema } from "../../../validations/signUpSchema";

import CheckEmailValidation from "../../../hooks/checkEmailValidation";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { resetUI, sigUpThunk } from "../../../store/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

type TForm = z.infer<typeof ZodSchema>

export default function SignUpComponent() {
    const navigate = useNavigate()
    const {error, loading, accessToken} = useAppSelector( (state) => state.auth )
    const [searchParams] = useSearchParams();
    const dispatchFormData = useAppDispatch()

    const {register, getFieldState, trigger ,handleSubmit, formState: { errors }} = useForm<TForm>({
        mode: 'onBlur',
        resolver: zodResolver(ZodSchema)
    })
    
    const FormSubmit: SubmitHandler<TForm> = (data) => {
        const {fullname, email, phonenumber, password, age} = data
        dispatchFormData(sigUpThunk({fullname, email, phonenumber, password, age})).unwrap().then( ()=>{navigate("/Login?message=account_created")} )
    }
    useEffect( () => {
        return () =>{
            dispatchFormData(resetUI())
        }
    },[dispatchFormData] )

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
        if(isDirty && invalid && EnterEmail) {
            resetEmailValidation()
        }
    }

    const StateValid = () => {
        if(EmailAvailabilityStatus === "checking") {
            if(EmailAvailabilityStatus) {
                return <> <p style={{color: "gray" ,fontSize: "13px"}}>Please Wait We Checking The Email Validation</p> </>
            }else  {
                return
            }
        }
        else if(EmailAvailabilityStatus === "Available" ) {
            if(EmailAvailabilityStatus) {
                return <> <p style={{color: 'green' ,fontSize: "13px"}} >Email is Valid To Use it</p> </>
            }else {
                return
            }
            
        }
        else if(EmailAvailabilityStatus === "Not Available") {
            if(EmailAvailabilityStatus) {
                return <> <p style={{color:"red" ,fontSize: "13px"}}>Email is already using</p> </>
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


    const disableCheck = () =>{
        if(EmailAvailabilityStatus === "checking") {
            return true
        }else {
            if(EmailAvailabilityStatus === "Not Available") {
                return true
            }else{
                return false
            }
        }
    }


    return (
        <div >
            <Header />
            <h1 className="title-form">SignUp</h1>
            <div className="form-login">
                <form onSubmit={handleSubmit(FormSubmit)}>
                    {searchParams.get("message") === "account_created" && <p style={{color: 'green' ,fontSize: "10px"}}> Your account successfully created, please login</p>}

                    <input type="text" autoFocus placeholder="Full Name" className="field"  {...register("fullname")} ></input>
                    <p>{errors.fullname?.message}</p>

                    <input type="text" placeholder="Email" className="field" {...register("email")} onBlur={EmailonBlureHandler}></input>
                    <p>{errors.email?.message}</p>
                    {StateValid()}

                    <input type="text" placeholder="Phone Number" className="field" {...register("phonenumber")} ></input>
                    <p>{errors.phonenumber?.message}</p>

                    <input type="text" placeholder="Age" className="field" {...register("age")} ></input>
                    <p>{errors.age?.message}</p>

                    <input type="password" placeholder="Password" className="field" {...register("password")} ></input>
                    <p>{errors.password?.message}</p>

                    <input type="password" placeholder="Repeat Password" className="field" {...register("ConfirmPassword")} ></input>
                    <p>{errors.ConfirmPassword?.message}</p>

                    <button className="submit btn" style={{border:"solid 1px #000"}} disabled={disableCheck()}>
                        {loading === "pending" ? <> <Spinner animation="border" size="sm"></Spinner>Loading...  </>: "SignUp"}
                    </button>

                    {error && <p style={{color: "red" ,fontSize: "13px"}}>{error}</p> }
                </form>
                <p className="BTN-login"> <Link to={"/Login"}>Login</Link> </p>
            </div>
        </div>
    )
}
