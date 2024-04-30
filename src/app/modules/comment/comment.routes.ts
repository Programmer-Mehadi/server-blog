import express from "express"
import validateRequest from "../../middlewares/validateRequets"
import BlogValidation from "./comment.validation"
import BlogController from "../blog/blog.controller"
import authMiddleware from "../../middlewares/authMiddleware"
const router = express.Router()

router.post(
  "/create",
  authMiddleware("admin", "user"),
  validateRequest(BlogValidation.createSchema),
  BlogController.create
)

const CommentRoutes = router

export default CommentRoutes
