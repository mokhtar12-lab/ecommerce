import { z } from "zod";

const ZodContactUsSchema = z.object({
    Name: z.string().min(1,{message: "Write Your Name"}),
    Email: z.string().min(1, {message: "Email is require"}).email(),
    Message : z.string().min(1, {message: "Write Your Message"}).max(200,{message: "That's Long Message"})
})

type Tcontact = z.infer<typeof ZodContactUsSchema>

export {ZodContactUsSchema, type Tcontact}