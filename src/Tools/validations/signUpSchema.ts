import { z } from "zod";

const ZodSchema = z.object({
    fullname: z.string().min(1, {message: "Full Name is required"}),
    email: z.string().min(1, {message: "Email is required"}).email(),
    phonenumber: z.string().max(11, {message: "Phone Number max 11"}),
    age: z.string().min(1, {message: "Age is required"}),
    password: z.string().min(8,{message: "password must be at least 8 characters"})
    .regex(/.*[!@#$%^&*()-+{}|[\]\\:";'<>?,./].*/, {message: "password should contain at least one character"}),
    ConfirmPassword: z.string().min(1, {message: "Confirm Password is required"}),
}).refine((input)=> input.password === input.ConfirmPassword, {message: "Password and ConfirmPassword is not match", path: ["ConfirmPassword"]} )

type TForm = z.infer<typeof ZodSchema>

export {ZodSchema, type TForm}