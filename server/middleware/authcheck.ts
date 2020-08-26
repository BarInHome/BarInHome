import * as jwt from 'jsonwebtoken';
// import jwtObj from '../config/jwt';
import { Request, Response, NextFunction } from 'express';
const process_env = require('../secret');
// const process_env = require('../../secret');
//우선 만료되었는지
//jwt.verify 쓰라고 하는데 뭐까지 해주는지 보자
interface TokenInterface {
    user: {
       id: string;
       role: string;
    };
  }

function authcheck(req:Request, res:Response, next:NextFunction) {
    // if (req.headers.authorization) {
    const token:string = req.headers.authorization.split('Bearer ')[1];
    jwt.verify(token, process_env.secret, function(err, decoded:TokenInterface) {
        console.log(decoded.user.id) // bar
        
        if(err){//토큰이 만료되었다면
            //토큰이 refresh 토큰인지 검사 //만약 refresh 토큰이라면
            //제대로 된 토큰 생성
            //밑에 refresh 함수
        }
    });
    

    //   jwt.verify(token, jwtObj.secret, (err) => {
    //     if (err) {
    //       res.status(401).json({ error: 'Auth Error from authChecker' });
    //     } else {
    //       next();
    //     }
    //   });
    // } else {
    //   res.status(401).json({ error: 'Auth Error from authChecker' });
}
//여기서 refresh 토큰 재발급 refresh 토큰 반환