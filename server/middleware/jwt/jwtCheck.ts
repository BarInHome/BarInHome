import jwt from 'jsonwebtoken';
import response from '../responseHelper/helper';
import express from 'express';
import { InternalServerError } from 'http-errors';
import { decode } from 'querystring';
const process_env = require('../../secret');

export interface payload {
    sub : string;
    roles : string;
}

// {
//     "name": "TokenExpiredError",
//     "message": "jwt expired",
//     "expiredAt": "2020-09-06T07:19:07.000Z"
// }

export const verifyToken = (req: express.Request,res: express.Response, next: express.NextFunction) => {
    const clientToken = req.headers['access_token'] as string;
    try{
        const decoded: payload = jwt.verify(clientToken, process_env.secret) as payload;
        if(decoded){
            if(decoded.roles === 'Admin') {
                req.user = decoded.sub;
                next();
            }
            else {
                // 권한 검사 로직
                req.user = decoded.sub;
                next();
            }
        }
        else{
            response.Helper.serverError(req,res,new InternalServerError());
        }
    }
    catch(err){
        response.Helper.jwtExpired(req,res,err);
    }
}
