import jwt from "jsonwebtoken"
const jwtTokenGenerate = (data: any, expireTime: any) => {
  return jwt.sign({ ...data }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: expireTime,
  })
}
const verifyJwtToken = (token: any) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string)
}

export { jwtTokenGenerate, verifyJwtToken }
