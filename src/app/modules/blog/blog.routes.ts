import express from "express"
import validateRequest from "../../middlewares/validateRequets"
import BlogValidation from "./blog.validation"
import BlogController from "./blog.controller"
import authMiddleware from "../../middlewares/authMiddleware"
const router = express.Router()

// create a blog
router.post(
  "/create",
  authMiddleware("admin", "user"),
  validateRequest(BlogValidation.createSchema),
  BlogController.create
)

// delete a blog
router.delete(
  "/delete/:blogId",
  authMiddleware("admin", "user"),
  BlogController.deleteBlog
)

// get single blog
router.get("/single/:blogId", BlogController.getSingle)

// update a blog
router.patch(
  "/update/:blogId",
  authMiddleware("admin", "user"),
  validateRequest(BlogValidation.updateSchema),
  BlogController.update
)

// get all blog
router.get("/all", BlogController.getAllBlog)

const BlogRoutes = router

export default BlogRoutes
