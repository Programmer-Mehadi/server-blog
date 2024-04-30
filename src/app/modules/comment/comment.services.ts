import prisma from "../../../shared/prisma"
import { v4 as uuid } from "uuid"

const createToDB = async (commentData: any) => {
  commentData.commentId = uuid()
  const result = await prisma.comment.create({ data: commentData })
  return result
}

const updateToDB = async (commentData: any) => {
  const result = await prisma.comment.update({
    where: { commentId: commentData.commentId, giverId: commentData.giverId },
    data: commentData,
  })
  return result
}

const deleteToDB = async (commentId: string, giverId: string) => {
  const result = await prisma.comment.delete({
    where: { commentId, giverId },
  })
  return result
}

const getAllCommentByBlogFromDB = async (blogId: string) => {
  const result = await prisma.comment.findMany({
    where: { blogId },
    select: {
      commentId: true,
      commentText: true,
      updatedAt: true,
      createdAt: true,
      giverId: true,
      user: {
        select: {
          name: true,
          profileImg: true,
        },
      },
    },
  })
  return result
}

const CommentServices = {
  createToDB,
  updateToDB,
  getAllCommentByBlogFromDB,
  deleteToDB,
}

export default CommentServices
