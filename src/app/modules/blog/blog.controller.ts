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

const getSingle = catchAsync(async (req: any, res: any, next: any) => {
  const { blogId } = req.params
  const blog = await BlogServices.getSingleFromDB(blogId)
  if (blog) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog get successfully",
      data: blog,
      meta: null,
    })
  }
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Blog cannot get, please try again",
    data: null,
    meta: null,
  })
})

const update = catchAsync(async (req: any, res: any, next: any) => {
  const blogData = req.body
  blogData.authorId = req.user.userId
  blogData.blogId = req.params.blogId
  const blog = await BlogServices.updateToDB(blogData)
  if (blog) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog updated successfully",
      data: blog,
      meta: null,
    })
  }
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Blog cannot update, please try again",
    data: null,
    meta: null,
  })
})

const getAllBlog = catchAsync(async (req: any, res: any, next: any) => {
  // set pagination
  let { page, limit } = req.query
  page = Number(page) || 1
  limit = Number(limit) || 15
  const pagination = { page, limit }
  // set search
  const { search = "" } = req.query
  // get data
  const blog = await BlogServices.getAllBlogFromDB(pagination, search)
  // if data inserted
  if (blog) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog get successfully",
      data: blog,
      meta: null,
    })
  }
  // if data not inserted
  return sendResponse(res, {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Blog cannot get, please try again",
    data: null,
    meta: null,
  })
})
const BlogController = { create, deleteBlog, getSingle, update, getAllBlog }

export default BlogController
