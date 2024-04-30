import express from "express"
import authMiddleware from "../../middlewares/authMiddleware"
import AuthController from "../auth/auth.controller"
import UserController from "./user.controller"
const router = express.Router()

router.get(
  "/details",
  authMiddleware("user", "admin"),
  UserController.getUserDetails
)

const UserRoutes = router

export default UserRoutes
