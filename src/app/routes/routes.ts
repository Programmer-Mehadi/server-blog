import { Router } from "express"
import AuthRoutes from "../modules/auth/auth.routes"

const routes = Router()

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
]

moduleRoutes.forEach((route) => routes.use(route.path, route.route))

export default routes
