import { Router } from "express"
import AuthRoutes from "../modules/auth/auth.routes"
import UserRoutes from "../modules/user/user.routes"
import BlogRoutes from "../modules/blog/blog.routes"
import CommentRoutes from "../modules/comment/comment.routes"

const routes = Router()

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
]

moduleRoutes.forEach((route) => routes.use(route.path, route.route))

export default routes
