import httpStatus from "http-status"
import prisma from "../../../shared/prisma"

const getDetailsFromDB = async (email: string) => {
  const findUser = await prisma.user.findUnique({
    where: { email },
  })
  if (!findUser) {
    return {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
      meta: null,
    }
  }
  return {
    statusCode: httpStatus.OK,
    success: true,
    message: "User found successfully",
    data: findUser,
    meta: null,
  }
}

const UserServices = { getDetailsFromDB }

export default UserServices
