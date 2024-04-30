import { v4 as uuid } from "uuid"
import prisma from "../../../shared/prisma"
import {
  makeBycrypt,
  makeBycryptToDecrypt,
} from "../../../shared/bcryptDecrypt"
import { jwtTokenGenerate } from "../../../helpers/jwtHelpers"
import index from "../../../config"

import httpStatus from "http-status"

const registerToDB = async (data: any) => {
  data.userId = uuid()
  data.password = await makeBycrypt(data.password)
  const insertUser = prisma.user.create({ data })
  return insertUser
}

const loginToDB = async (data: any) => {
  // find user
  const loginUser: any = await prisma.user.findUnique({
    where: { email: data.email },
  })
  // if not find user
  if (!loginUser) {
    return {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
      meta: null,
    }
  }
  // chcek password match
  const isPasswordMatch = await makeBycryptToDecrypt(
    data.password,
    loginUser.password
  )
  // if password not match
  if (!isPasswordMatch) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Password is incorrect",
      data: null,
      meta: null,
    }
  }
  // generate token
  const token = jwtTokenGenerate(
    {
      userId: loginUser.userId,
      email: loginUser.email,
      role: loginUser.role,
    },
    index.jwt.expires_in
  )
  // if token not generate
  if (!token) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Token cannot be generated",
      data: null,
      meta: null,
    }
  }
  // if token generate
  return {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: {
      token: token,
      user: loginUser,
    },
    meta: null,
  }
}

const AuthServices = {
  registerToDB,
  loginToDB,
}

export default AuthServices
