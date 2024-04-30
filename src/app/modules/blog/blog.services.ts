import { v4 as uuid } from "uuid"
import prisma from "../../../shared/prisma"
import { IPagination } from "../../../interfaces/pagination"

const createToDB = async (blogData: any) => {
  blogData.blogId = uuid()
  const insertBlog = await prisma.blog.create({ data: blogData })
  return insertBlog
}

const deleteToDB = async (blogId: string, userId: string) => {
  const deleteBlog = await prisma.blog.deleteMany({
    where: { blogId, authorId: userId },
  })
  return deleteBlog
}

const getSingleFromDB = async (blogId: string) => {
  const blog = await prisma.blog.findUnique({ where: { blogId } })
  return blog
}

const updateToDB = async (blogData: any) => {
  const updateBlog = await prisma.blog.update({
    where: { blogId: blogData.blogId, authorId: blogData.authorId },
    data: blogData,
  })
  return updateBlog
}

const getAllBlogFromDB = async (pagination: IPagination, search?: string) => {
  // get data by pagination and search value
  const blog = await prisma.blog.findMany({
    where: {
      title: {
        contains: search,
      },
      content: {
        contains: search,
      },
    },
    select: {
      blogId: true,
      title: true,
      imageUrl: true,
      content: true,
      authorId: true,
      user: {
        select: {
          name: true,
          profileImg: true,
        },
      },
    },
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit,
  })
  return blog
}

const BlogServices = {
  createToDB,
  deleteToDB,
  getSingleFromDB,
  updateToDB,
  getAllBlogFromDB,
}

export default BlogServices
