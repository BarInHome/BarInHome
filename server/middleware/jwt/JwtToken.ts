import jwt from 'jsonwebtoken';
import doQuery from '../../database/doQuery';

const process_env = require('../../secret');
interface Token {
    readonly accesstoken : string;
    readonly refreshtoken : string;
}

export interface payload {
    sub : string;
    roles : string;
}

async function create(id: string , roles= 'user'): Promise<Token>{
    const payload: payload = {
        sub : id,
        roles: roles,
    };
    const accesstoken: string = jwt.sign( payload, process_env.secret, { expiresIn:  '7m'} );
    const refreshtoken: string = jwt.sign( {}, process_env.secret, { expiresIn:  '24h' } );
    return { accesstoken,refreshtoken };
}

export default {
    create
}