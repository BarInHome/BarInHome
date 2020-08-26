import jwt from 'jsonwebtoken';
import doQuery from '../../database/doQuery';

const process_env = require('../../secret');
interface Token {
    readonly token : string;
}

async function  create(id: string , options?: any): Promise<Token>{
    const token: string = jwt.sign( {id: id}, process_env.secret, { expiresIn:  '48h'} ); 
    // token save;
    return { token };
}

export default {
    create,
    
}