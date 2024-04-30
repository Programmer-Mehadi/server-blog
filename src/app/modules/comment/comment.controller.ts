import httpStatus from "http-status"
import sendResponse from "../../../shared/sendResponse"
import catchAsync from "../../middlewares/catchAsync"
import CommentServices from "./comment.services"

const create = catchAsync(async (req: any, res: any, next: any) => {
  const commentData = req.body
  commentData.giverId = req.user.userId
  const comment = await CommentServices.createToDB(commentData)
  if (comment) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment created successfully",
      data: comment,
      meta: null,
    })
  }
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Comment cannot create, please try again",
    data: null,
    meta: null,
  })
})

const update = catchAsync(async (req: any, res: any, next: any) => {
  const commentData = req.body
  commentData.commentId = req.params.commentId
  commentData.giverId = req.user.userId
  const comment = await CommentServices.updateToDB(commentData)
  if (comment) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment updated successfully",
      data: comment,
      meta: null,
    })
  }
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Comment cannot update, please try again",
    data: null,
    meta: null,
  })
})

const getAllCommentByBlog = catchAsync(
  async (req: any, res: any, next: any) => {
    const blogId = req.params.blogId
    const comment = await CommentServices.getAllCommentByBlogFromDB(blogId)
    if (comment) {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment get successfully",
        data: comment,
        meta: null,
      })
    }
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Comment cannot get, please try again",
      data: null,
      meta: null,
    })
  }
)

const deleteComment = catchAsync(async (req: any, res: any, next: any) => {
  const { commentId } = req.params
  const { userId } = req.user
  const comment = await CommentServices.deleteToDB(commentId, userId)
  if (comment) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment deleted successfully",
      data: comment,
      meta: null,
    })
  }
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Comment cannot delete, please try again",
    data: null,
    meta: null,
  })
})
const CommentController = { create, update, deleteComment, getAllCommentByBlog }

export default CommentController
