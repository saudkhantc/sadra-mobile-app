import * as z from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password at least 8 character long" }),
});

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password at least 8 character long" }),
});

export const ForgotPassword = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

export const ResetPassword = z.object({
  password: z
    .string()
    .min(6, { message: "Password at least 8 character long" }),
});
