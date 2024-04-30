import { z } from "zod"

const createSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    videoUrl: z.string({
      required_error: "Video Url is required",
    }),
    imageUrl: z.string({
      required_error: "Image Url is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
  }),
})
const updateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    videoUrl: z.string({
      required_error: "Video Url is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
    imageUrl: z.string({
      required_error: "Image Url is required",
    }),
  }),
})

const BlogValidation = {
  createSchema,
  updateSchema,
}

export default BlogValidation
