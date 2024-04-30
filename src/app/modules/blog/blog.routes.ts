import express from "express"
import validateRequest from "../../middlewares/validateRequets"
import BlogValidation from "./blog.validation"
import BlogController from "./blog.controller"
import authMiddleware from "../../middlewares/authMiddleware"
const router = express.Router()

router.post(
  "/create",
  authMiddleware("admin", "user"),
  validateRequest(BlogValidation.createSchema),
  BlogController.create
)

router.delete(
  "/delete/:blogId",
  authMiddleware("admin", "user"),
  BlogController.deleteBlog
)

router.get("/all", BlogController.getSingle)

const BlogRoutes = router

export default BlogRoutes
