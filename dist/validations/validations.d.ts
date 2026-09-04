import z from "zod";
export declare const signUpSchema: z.ZodObject<{
    userName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const todoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=validations.d.ts.map