import z from "zod";
export const signUpSchema = z.object({
    userName: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
});
export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const todoSchema = z.object({
    title: z.string().min(4),
    description: z.string().optional(),
});
//# sourceMappingURL=validations.js.map