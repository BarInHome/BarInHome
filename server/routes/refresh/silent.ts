import express from 'express';
import jwt, { JsonWebTokenError, VerifyCallback } from 'jsonwebtoken';
import JwtToken from '../../middleware/jwt/JwtToken'
import dbQuery from '../../database/doQuery';

const process_env = require('../../secret');
const router = express.Router();

router.post('/', (req,res) => {
    console.log("hello");
    const refresh = req.cookies['refresh_token'].split('Bearer ')[1];
    console.log(refresh);
    const sql1='SELECT id FROM userinfo WHERE refresh = ?';
    const sql2='UPDATE userinfo SET refresh = ? WHERE id = ?';
    
    jwt.verify(refresh,process_env.secret, function(err:JsonWebTokenError) {
        if(err)
            res.send(err);
        dbQuery(sql1,[refresh])
            .then((row)=>{
                console.log(row.result[0]);
                console.log(row.result[0].id);
                const id =row.result[0].id;

                JwtToken.create(id)
                .then((result)=>{
                    const {refreshtoken,accesstoken}=result;
                    dbQuery(sql2,[refreshtoken,id])
                    .then((row)=>{
                        res.header({
                            'Authorization':`Bearer ${accesstoken}`
                        });
                        res.cookie('refresh_token',`Bearer ${refreshtoken}`,{httpOnly:true});
                        res.send();
                    })  
                    .catch((err)=>{
                    }) 
                })                
            })
            .catch((err)=>{
                console.log("첫번쨰 쿼리문 ");
                res.redirect('http://localhost:3000/');
                //추후에 로그인이나 회원가입 페이지가 올것이다
            })
    }as VerifyCallback);   
});

export default router;