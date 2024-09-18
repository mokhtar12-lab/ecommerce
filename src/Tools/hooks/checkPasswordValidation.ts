import { useState } from "react";

import axios from "axios";

type TStatus = "idle" | "checking" | "Available" | "Not Available" | "failed"

const CheckPasswordValidation = () => {
    const [PasswordAvailabilityStatus, setPasswordAvailabilityStatus] = useState<TStatus>("idle");
    const [EnterPassword, setEnterPassword] = useState<null | string>(null);

    const CheckPasswordAvailability = async (passwod: string) => {
        setEnterPassword(passwod);
        setPasswordAvailabilityStatus("checking");
        try {
            const response = await axios.get(`http://localhost:3000/users?password=${passwod}`);
            if (response.data.length) {
                setPasswordAvailabilityStatus("Available");
            } else {
                setPasswordAvailabilityStatus("Not Available");
            }
        } catch  {
            setPasswordAvailabilityStatus("failed");
        }
    }

    const resetPasswordValidation = () =>{
        setPasswordAvailabilityStatus("idle");
        setEnterPassword(null);
    }

    return { PasswordAvailabilityStatus, EnterPassword, CheckPasswordAvailability, resetPasswordValidation };
};


export default CheckPasswordValidation;