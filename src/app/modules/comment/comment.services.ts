import prisma from "../../../shared/prisma"
import { v4 as uuid } from "uuid"

const createToDB = async (commentData: any) => {
  commentData.commentId = uuid()
  const result = await prisma.comment.create({ data: commentData })
  return result
}

const CommentServices = { createToDB }

export default CommentServices
