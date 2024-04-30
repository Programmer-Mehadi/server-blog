import { v4 as uuid } from "uuid"
import prisma from "../../../shared/prisma"

const createToDB = async (blogData: any) => {
  const blogId = uuid()
  blogData.blogId = blogId
  const insertBlog = await prisma.blog.create({ data: blogData })
  return insertBlog
}

const BlogServices = { createToDB }

export default BlogServices
