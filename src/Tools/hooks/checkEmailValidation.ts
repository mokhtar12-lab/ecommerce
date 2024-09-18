import { useState } from "react";

import axios from "axios";

type TStatus = "idle" | "checking" | "Available" | "Not Available" | "failed"

const CheckEmailValidation = () => {
    const [EmailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>("idle");
    const [EnterEmail, setEnterEmail] = useState<null | string>(null);

    const CheckEmailAvailability = async (email: string) => {
        setEnterEmail(email);
        setEmailAvailabilityStatus("checking");
        try {
            const response = await axios.get(`http://localhost:3000/users?email=${email}`);
            if (!response.data.length) {
                setEmailAvailabilityStatus("Available");
            } else {
                setEmailAvailabilityStatus("Not Available");
            }
        } catch  {
            setEmailAvailabilityStatus("failed");
        }
    }

    const resetEmailValidation = () =>{
        setEmailAvailabilityStatus("idle");
        setEnterEmail(null);
    }

    return { EmailAvailabilityStatus, EnterEmail, CheckEmailAvailability, resetEmailValidation };
};


export default CheckEmailValidation;