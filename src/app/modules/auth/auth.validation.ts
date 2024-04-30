import { z } from "zod"

const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3, {
        message: "Name must be at least 3 characters",
      })
      .max(255, {
        message: "Name must be less than 255 characters",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Must be a valid email",
      })
      .min(5, {
        message: "Email must be at least 5 characters",
      })
      .max(255, {
        message: "Email must be less than 255 characters",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(255, {
        message: "Password must be less than 255 characters",
      }),
    profileImg: z.string({
      required_error: "Profile image is required",
    }),
  }),
})

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Must be a valid email",
      })
      .min(5, {
        message: "Email must be at least 5 characters",
      })
      .max(255, {
        message: "Email must be less than 255 characters",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(255, {
        message: "Password must be less than 255 characters",
      }),
  }),
})

const AuthValidation = {
  registerSchema,
  loginSchema,
}

export default AuthValidation
