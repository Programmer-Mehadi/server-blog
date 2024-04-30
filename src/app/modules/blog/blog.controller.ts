import httpStatus from "http-status"
import sendResponse from "../../../shared/sendResponse"
import catchAsync from "../../middlewares/catchAsync"
import BlogServices from "./blog.services"

const create = catchAsync(async (req: any, res: any, next: any) => {
  // set data
  const blogData = req.body
  blogData.authorId = req.user.userId
  // insert data
  const blog = await BlogServices.createToDB(blogData)
  //  if data inserted
  if (blog) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog created successfully",
      data: blog,
      meta: null,
    })
  }
  // if data not inserted
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Blog cannot create, please try again",
    data: null,
    meta: null,
  })
})

const deleteBlog = catchAsync(async (req: any, res: any, next: any) => {
  const { blogId } = req.params
  const { userId } = req.user
  const blog = await BlogServices.deleteToDB(blogId, userId)
  if (blog) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog deleted successfully",
      data: blog,
      meta: null,
    })
  }
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Blog cannot delete, please try again",
    data: null,
    meta: null,
  })
})

const BlogController = { create, deleteBlog }

export default BlogController
