import express, { Request, Response, NextFunction} from 'express' // 1

const router = express.Router();

export const signup = (callback: Send) => {
    request.get('https://naver.com', (err, res) => {
        if (err) callback('');
        callback(res.body);
});

// import request from 'request';
// //express의 get 메서드의 타입정의
// import { Send } from 'express';
// export const crawl = (callback: Send) => {
//   request.get('https://naver.com', (err, res) => {
//     if (err) callback('');
//     callback(res.body);
// });