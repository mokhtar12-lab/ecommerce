import { z } from "zod";

const ZodLogInSchema = z.object({
    email: z.string().min(1, {message: "Email is require"}).email(),
    password: z.string().min(1,{message: "password is require"})
})

type TForm = z.infer<typeof ZodLogInSchema>

export {ZodLogInSchema, type TForm}