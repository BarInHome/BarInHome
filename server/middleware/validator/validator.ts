import express from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer';
import response from '../responseHelper/helper';
import jwt from 'jsonwebtoken';
const process_env = require('../../secret');

/*
    body or query 에 정의한 파라미터 필드가 존재 하는지 검사한다.
    필드가 존재 할 경우 pass, 없을 경우 fail 시키고
    parameter missing 예외를 발생시킨다.

    input   :   req, res, options, next,
    output  :   {
                    data,
                    status,
                }
                or
                new Exception
*/

async function paramValidator<T>(
    req: express.Request, 
    res: express.Response, 
    dto: ClassType<T>, 
    next: express.NextFunction):Promise<void> {
    const methodType = req.method;

    switch(methodType){
        case 'GET':
            const query = req.query;
            const queryToClass = plainToClass(dto,query);
            const queryErrors = await validate(queryToClass);
            if(queryErrors.length > 0){
                response.Helper.badRequest(req,res,queryErrors);
            }
            else{
                next();
            }
            return;
        case 'POST':
            const {...values} = req.body;
            const bodyToClass = plainToClass(dto,values);
            const bodyErrors = await validate(bodyToClass);

            if(bodyErrors.length > 0){
                response.Helper.badRequest(req,res,bodyErrors);
            }
            else{
                next();
            }
            return;
        default:
            response.Helper.badRequest(req,res,['Invalid Request Method']);
            return;
    }
};

export interface payload {
    sub : string;
    roles : string;
}

export type Roles = 'Admin' | 'User' | 'UnauthorizationUser';

async function rolesValidator<T>(
    req: express.Request, 
    res: express.Response,  
    next: express.NextFunction):Promise<void> {
    
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
        response.Helper.invalid(req,res,['Permission Denied ...']);
    }
};

async function requireHeader(
    req: express.Request, 
    res: express.Response,  
    next: express.NextFunction):Promise<void> {
    
    
}

export default {
    paramValidator,
    rolesValidator,
    requireHeader,
    
}
