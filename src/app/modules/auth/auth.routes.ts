import express from "express"
import validateRequest from "../../middlewares/validateRequets"
import AuthValidation from "./auth.validation"
import AuthController from "./auth.controller"
const router = express.Router()

router.post(
  "/register",
  validateRequest(AuthValidation.registerSchema),
  AuthController.register
)

router.get(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  AuthController.login
)

const AuthRoutes = router

export default AuthRoutes
