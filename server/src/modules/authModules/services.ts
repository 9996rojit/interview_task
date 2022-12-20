
import { User } from "./domain";
import { comparePassword, getToken } from "./utils";


export const loginService = async (info: any) => {
  try {
    const { email, password } = info
    const userData = await User.findOne({ where: { email: email } })
    const isValidPassword = await comparePassword(password, userData.password);
    if (!isValidPassword) {
      return false
    }
    const tokenPayload = {
      id:userData.id,
      email:userData.email,
    }
    const token = await getToken(tokenPayload);
    return token
  } catch (err) {
    return err
  }
}



export const registerService = async (info: any) => {
  try {
    const user = await User.findOne({ where: { email: info.email } })
    if (user) {
      return false
    }
   const newUser = await User.create(info)
   const { password, ...rest } = newUser
    

    return rest
  } catch (err) {
    return err
  }
}