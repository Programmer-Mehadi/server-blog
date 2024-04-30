class ApiError extends Error {
  statusCode
  status: boolean = false
  errorMessages: null | undefined

  constructor(statusCode: number, message: string, stack = "") {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
