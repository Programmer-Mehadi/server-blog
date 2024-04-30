import { z } from "zod"

const createSchema = z.object({
  body: z.object({
    blogId: z.string({
      required_error: "Blog Id is required",
    }),
    commentText: z.string({
      required_error: "Comment text is required",
    }),
  }),
})
const updateSchema = z.object({
  body: z.object({
    blogId: z.string({
      required_error: "Blog Id is required",
    }),
    commentText: z.string({
      required_error: "Comment text is required",
    }),
  }),
})

const CommentValidation = {
  createSchema,
  updateSchema,
}

export default CommentValidation
