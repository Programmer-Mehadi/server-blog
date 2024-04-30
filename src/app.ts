import cookieParser from "cookie-parser"
import cors from "cors"
import express, { Application, NextFunction, Request, Response } from "express"
import fileUpload from "express-fileupload"
import httpStatus from "http-status"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import routes from "./app/routes/routes"

const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(fileUpload())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Welcome to the Blog Server, Server is running Successfully !",
  })
})

app.use("/api/v1", routes)

//global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  })
  next()
})

export default app
