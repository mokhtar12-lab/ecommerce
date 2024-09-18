import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodContactUsSchema } from "../../../validations/contactusSchema"; 


type TContactUs = z.infer<typeof ZodContactUsSchema>

import  "./contactStyle.css"
export default function Contact() {

    const {register, handleSubmit, formState:{errors}} = useForm<TContactUs>({
        mode: 'onBlur',
        resolver: zodResolver(ZodContactUsSchema)
    })

    const ContactUsSubmit: SubmitHandler<TContactUs> = (data) =>{
        console.log(data);
        
    }

    return (
            <>
                <h1 className="title-contact">ContactUS</h1>
                <div className="container info-contact">
                    <p>If you have any questions or need help, please fill out the form below. We do our best to respond within 1 business day.</p>
                    <form onSubmit={handleSubmit(ContactUsSubmit)} className="form-contact">
                        <p className="message-error-contact">{errors.Name?.message}</p>
                        <input type="text" placeholder="Enter Your Full Name" className="field"  {...register("Name")}></input>
                        
                        <p className="message-error-contact">{errors.Email?.message}</p>
                        <input type="email" placeholder="Enter Your Email" className="field"  {...register("Email")}></input>

                        <p className="message-error-contact">{errors.Message?.message}</p>
                        <textarea placeholder="Enter Your Message maxmum 200 litter" className="field"  {...register("Message")}></textarea>
                        <input type="submit" placeholder="" className="submit"></input>

                    </form>
                </div>
            </>
    )
}
