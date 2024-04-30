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

const BlogServices = { createToDB, deleteToDB }

export default BlogServices
