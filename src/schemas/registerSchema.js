import { object, string } from "zod"

export const registerSchema = object({
    name: string({ required_error: "Name is required" }),
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    passwordConfirmation: string({ required_error: "Password Confirmation is required" })
        .min(1, "Password confirmation is required")
        .min(8, "Password confirmation must be more than 8 characters")
        .max(32, "Password confirmation must be less than 32 characters"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password and password confirmation don't match."
});