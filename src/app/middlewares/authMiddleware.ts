import { NextFunction, Request, Response } from "express"
import ApiError from "../../errors/ApiError"
import { verifyJwtToken } from "../../helpers/jwtHelpers"
import { JwtPayload } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

const authMiddleware =
  (...rolesList: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check token in headers
      if (!req?.headers?.authorization) {
        return next(new ApiError(400, "Token not found", ""))
      }

      const token = req?.headers?.authorization.split(" ")[1]
      // verify token by jwt
      if (!token) {
        return next(new ApiError(401, "Unauthorized", ""))
      }
      const verify = await verifyJwtToken(token)

      // Type guard to ensure TypeScript understands the type
      if (typeof verify === "string") {
        // Handle the case when verify is a string
        return next(new ApiError(401, "Unauthorized", ""))
      }

      // set user data
      req.user = verify
      // console.log(verify)
      // check user roles
      if (
        rolesList.includes(verify.role?.toLowerCase()) ||
        rolesList.includes(verify.role?.toUpperCase())
      ) {
        return next()
      }

      // if not authorized then return error
      return next(new ApiError(401, "You are not authorized", ""))
    } catch (error) {
      next(error)
    }
  }

export default authMiddleware
