import jwt from 'jsonwebtoken';
import doQuery from '../../database/doQuery';

const process_env = require('../../secret');
interface Token {
    readonly accesstoken : string;
    readonly refreshtoken : string;
}

async function  create(id: string , options?: any): Promise<Token>{
    const accesstoken: string = jwt.sign( {id: id}, process_env.secret, { expiresIn:  '48h'} ); 
    // token save;
    const refreshtoken: string = jwt.sign( {}, process_env.secret, { expiresIn:  '48h'} ); 
    return {accesstoken,refreshtoken};
}

export default {
    create
}