import bcrypt from "bcrypt"
const saltRounds = 10

export const makeBycrypt = async (text: String | any) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(text, salt)
  return hash
}

export const makeBycryptToDecrypt = async (text: String | any, hash: any) => {
  return await bcrypt.compare(text, hash)
}
