import express from 'express';
import doQuery from '../../database/doQuery';
const router = express.Router();


router.route('/')
    .post(
     (req,res)=>{
        console.log('[Signup]',req.body);  
        const {name,id,pw} = req.body;

         const sqlDupleCheck = 'SELECT * FROM userinfo WHERE id = ?';
         doQuery(sqlDupleCheck,[id])
            .then((row)=>{
                if(row.result[0]){
                //dupeld
                console.log("[SIGNUP ERROR] Try Again");
                //status == 401
                return res.sendStatus(401);
                }
                else{
                //ok
                const sql = 'INSERT INTO userinfo(id,pw,name) VALUES(?,?,?)';
                const params = [id,pw,name];

                doQuery(sql,params) 
                .then((row)=>{
                    return res.sendStatus(200);
                })
                .catch((err)=>{
                    console.log(err);
                    return res.sendStatus(400);
                })
                }
        })
     }   
    )

export default router;

/*
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

*/

