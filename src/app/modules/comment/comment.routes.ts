import express from "express"
import validateRequest from "../../middlewares/validateRequets"
import authMiddleware from "../../middlewares/authMiddleware"
import CommentValidation from "./comment.validation"
import CommentController from "./comment.controller"
const router = express.Router()

router.post(
  "/",
  authMiddleware("admin", "user"),
  validateRequest(CommentValidation.createSchema),
  CommentController.create
)

router.patch(
  "/:commentId",
  authMiddleware("admin", "user"),
  validateRequest(CommentValidation.updateSchema),
  CommentController.update
)

router.delete(
  "/:commentId",
  authMiddleware("admin", "user"),
  CommentController.deleteComment
)

router.get("/all/:blogId", CommentController.getAllCommentByBlog)

const CommentRoutes = router

export default CommentRoutes
