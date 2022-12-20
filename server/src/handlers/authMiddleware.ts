import { NextFunction, Request } from "express";
import httpStatus from "http-status";
import { User } from "../modules/authModules/domain";
import { responseHandler } from "./responseHandler";
const jwt = require('jsonwebtoken');

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const authToken: any = req.headers['authorization'] || req.headers['Authorization']
    if (authToken) {
        const token = authToken.split(" ");
        if (token[0] === 'bearer' || 'Bearer' && token[1].length > 7) {
            await jwt.verify(token[1], process.env.SECRET_KEY, async (err: any, decode: { id: any; email: any; }) => {
                if (err) return responseHandler(res, httpStatus["FORBIDDEN"], false, null, null, "You are not authorized", null)
                else {
                    const user = await User.findOne({
                        where: { id: decode.id, email: decode.email }
                    })
                    if (!user) responseHandler(res, httpStatus["UNAUTHORIZED"], false, null, null, "You are not authorized", null)
                    next()
                }
            })
        }
        else return responseHandler(res, httpStatus['UNAUTHORIZED'], false, null, null, "Unauthorized access please provide token", null)
    }
    else responseHandler(res, httpStatus['UNAUTHORIZED'], false, null, null, "Unauthorized access please provide token", null)

}