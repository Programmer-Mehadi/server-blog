import sendResponse from "../../../shared/sendResponse"
import catchAsync from "../../middlewares/catchAsync"
import UserServices from "./user.services"

const getUserDetails = catchAsync(async (req: any, res: any, next: any) => {
  const { email } = req.user
  const result = await UserServices.getDetailsFromDB(email)
  return sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
    meta: result.meta,
  })
})

const UserController = { getUserDetails }

export default UserController
