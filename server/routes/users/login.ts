import express, { Request, Response, NextFunction} from 'express' // 1
const router = express.Router();

interface Iuser{
    Id: string;
    password: string;
  }

export export const signup = (callback: Send) => {
    request.get('https://naver.com', (err, res) => {
        if (err) callback('');
        callback(res.body);
});