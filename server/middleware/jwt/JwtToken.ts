import jwt from 'jsonwebtoken';
import doQuery from '../../database/doQuery';

const process_env = require('../../secret');
interface Token {
    readonly token : string;
}
export interface payload {
    sub : string;
    roles : string;
}

async function create(id: string , roles= 'user'): Promise<Token>{
    const payload: payload = {
        sub : id,
        roles: roles,
    }
    const token: string = jwt.sign( payload, process_env.secret, { expiresIn:  '48h'} );
    return { token };
}

export default {
    create,
    
}