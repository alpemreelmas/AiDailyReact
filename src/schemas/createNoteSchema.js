import { object, string } from "zod"

export const createNoteSchema = object({
    content: string({ required_error: "Content is required" })
})