import { z } from "zod"
const handleZodError = (error: z.ZodError) => {
  const errors = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  }
}

export default handleZodError
