import { object, string } from "zod"

export const resetPasswordSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    newPassword: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmNewPassword: string({ required_error: "Password confirmation is required" })
        .min(1, "Password confirmation is required")
        .min(8, "Password confirmation must be more than 8 characters")
        .max(32, "Password confirmation must be less than 32 characters")
        .refine((data) => data.newPassword === data.confirmNewPassword, {
            message: "Password and password confirmation don't match."
        })
})