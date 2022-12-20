import { UserToken } from "./token.domain";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export const comparePassword = async (password: string, userPassword: string) => {
  console.log(userPassword, password)
  const data = await bcrypt.compare(password, userPassword);
  return data
}


export const getNewTokens = async (data: { id: any; email: any; }, expiresIn: string, key: string | undefined) => {
  return jwt.sign(data, key, { expiresIn: expiresIn })
}

export const getToken = async (userData: any) => {
  const accessToken = await getNewTokens(userData, "5s", process.env.SECRET_KEY)
  const refreshToken = await getNewTokens(userData, "1d", process.env.REFRESH_SECRETKEY)


  const userToken = await UserToken.findOne({ where: { userId: userData.id } })
  if (userToken) {
    await userToken.update({ refreshToken: refreshToken })
  } else UserToken.create({ userId: userData.id, refreshToken: refreshToken })
  return { refreshToken, accessToken }
}

export const validateRefreshToken = (refreshToken: string) => {
  return new Promise((reslove, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_SECRETKEY, (err: any, payload: any) => {
      if (err) return reject(err);
      else {
        const accessToken = jwt.sign(payload.email, process.env.SECRET_KEY, { expiresIn: '15m' })
        return accessToken
      }
    })


  })
} 