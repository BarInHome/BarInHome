import jwt from 'jsonwebtoken';
import { decode } from 'punycode';
import express from 'express';
const process_env = require('../../secret');

export interface payload {
    sub : string;
    roles : string;
}

export const verifyToken = (req: express.Request,res: express.Response, next: express.NextFunction) => {
    const clientToken = req.body.token;
    const decoded: payload = jwt.verify(clientToken, process_env.secret) as payload;

    if(decoded){
        if(decoded.roles === 'Admin') next();
        else {
            // 권한 검사 로직
            next();
        }
    }
    else{
        res.send(false).status(401);
    }
}
