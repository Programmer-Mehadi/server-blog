import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  database_url: process.env.DATABSE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
}
