import { v4 as uuid } from "uuid"
import prisma from "../../../shared/prisma"

const createToDB = async (blogData: any) => {
  const blogId = uuid()
  blogData.blogId = blogId
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

const BlogServices = { createToDB, deleteToDB, getSingleFromDB, updateToDB }

export default BlogServices
