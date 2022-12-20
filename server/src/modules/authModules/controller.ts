import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "../../handlers/responseHandler";
const jwt = require('jsonwebtoken');
import { loginService, registerService } from "./services";
import { getNewTokens } from "./utils";
import { userExist } from "./validators";
// import jwt from 'jsonwebtoken'



export const login = async (req: Request, res: Response) => {
  try {
    const isUserExist = await userExist(req.body)
    console.log("🚀 ~ file: controller.ts:15 ~ login ~ isUserExist", isUserExist)
    if (isUserExist) {
      const responseToken:any = await loginService(req.body)
     if(responseToken){
      res.cookie('jwt', responseToken.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60*1000 });
      return responseHandler(res, httpStatus['OK'], true, null, null, "Login successfull.", responseToken.accessToken)
     }else{
      return responseHandler(res, httpStatus['403'], true, null, null, "Login Failed.", null)

     }
    }
    return responseHandler(res, httpStatus['NOT_ACCEPTABLE'], false, null, null, "User does not exists.", null)
  } catch (error) {
    return responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Usename of password does not match!!", null)
  }

}

export const register = async (req: Request, res: Response) => {
  try {
    const isUserExist = await userExist(req.body)
    if (!isUserExist) {
      const createdUser = await registerService(req.body)
      return responseHandler(res, httpStatus['CREATED'], true, createdUser, null, "User created successfully.", null)
    }
    responseHandler(res, httpStatus['NOT_ACCEPTABLE'], false, null, null, "User already exists.", null)
  } catch (error) {
    responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Server issue.", null)
  }

}


export const getNewToken = async (req: Request, res: Response, next: NextFunction) => {
  const authToken: any = req.cookies
 
  if (authToken) {

      await jwt.verify(authToken.jwt, process.env.REFRESH_SECRETKEY, async (err: any, decode: { id: any; email: any; }) => {
        if (err) return responseHandler(res, httpStatus["FORBIDDEN"], false, null, null, "You are not authorized", null)
        else {
          const { id, email } = decode
          const newTokens = await getNewTokens({ id, email }, "5s", process.env.SECRET_KEY)
          responseHandler(res, httpStatus["OK"], true, null, null, "You are not authorized", newTokens)
        }
      })
    }
    else return responseHandler(res, httpStatus['UNAUTHORIZED'], false, null, null, "Unauthorized access please provide token", null)

}