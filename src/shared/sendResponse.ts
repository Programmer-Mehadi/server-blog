import { Response } from "express"

interface IResponse {
  statusCode: number
  success: boolean
  message: string
  meta: any
  data: any
}

const sendResponse = (res: Response, data: IResponse) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
