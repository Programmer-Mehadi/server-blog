import ApiError from "../../errors/ApiError"
import handleZodError from "../../errors/handleZodError"
import { ZodError } from "zod"
import { Request, Response, NextFunction } from "express"
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error:", error)
  let statusCode = error?.statusCode || 500
  let success = error?.status || false
  let message = error?.message || "Something went wrong!"
  let errorMessages = error?.errorMessages || null

  if (error instanceof ApiError) {
    statusCode = error?.statusCode
    success = error?.status || false
    message = error?.message
    errorMessages = error?.errorMessages || null
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    // console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode || 400
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (error?.code === 1062) {
    statusCode = 400
    message = "Duplicate key error"
    errorMessages = [
      {
        path: error?.sqlMessage?.split("'")[1],
        message: `${error?.sqlMessage?.split("'")[1]} already exists`,
      },
    ]
  } else if (error?.code === 1452) {
    statusCode = 400
    message = "Cannot delete or update a parent row"
    errorMessages = []
  } else if (error?.code == "P2003") {
    statusCode = 400
    message = "Cannot make the operation, please contact with admin."
    errorMessages = []
  }
  // console.log(error)
  res.status(statusCode).json({
    success,
    message,
    errorMessages,
    statusCode,
  })
}

export default globalErrorHandler
