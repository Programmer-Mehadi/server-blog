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

const CommentController = { create }

export default CommentController
