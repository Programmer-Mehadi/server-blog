import { Router } from "express"
import AuthRoutes from "../modules/auth/auth.routes"
import UserRoutes from "../modules/user/user.routes"

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
]

moduleRoutes.forEach((route) => routes.use(route.path, route.route))

export default routes
