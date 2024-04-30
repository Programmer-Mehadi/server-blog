import sendResponse from "../../../shared/sendResponse"
import catchAsync from "../../middlewares/catchAsync"
import AuthServices from "./auth.services"
import httpStatus from "http-status"

const register = catchAsync(async (req: any, res: any, next: any) => {
  const userData = req.body
  const user = await AuthServices.registerToDB(userData)
  if (user) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: user,
      meta: null,
    })
  } else {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "User cannot register, please try again",
      data: null,
      meta: null,
    })
  }
})

const login = catchAsync(async (req: any, res: any, next: any) => {
  const userData = req.body
  const result = await AuthServices.loginToDB(userData)
  return sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
    meta: result.meta,
  })
})

const AuthController = { register, login }

export default AuthController
