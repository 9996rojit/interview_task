
import { User } from "./domain"

export const userExist = async (info: any) => {
  const check = await User.findOne({ where: { email: info.email } })
  if (!check) {
    return false
  }
  return true
}