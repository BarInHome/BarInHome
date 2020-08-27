import express from 'express';
import jwt, { JsonWebTokenError, VerifyCallback } from 'jsonwebtoken';
import JwtToken from '../../middleware/jwt/JwtToken'
import dbQuery from '../../database/doQuery';

const process_env = require('../../secret');
const router = express.Router();

router.post('/', (req,res) => {
    const refresh = <string>req.header('Refresh');
    const sql1='SELECT refresh,id FROM barinhome WHERE refresh = ?';
    const sql2='UPDATE userinfo SET refresh = ? WHERE id = ?';
    
    jwt.verify(refresh,process_env.secret, function(err:JsonWebTokenError) {
        if(err)
            res.send(err);
        dbQuery(sql1,[refresh])
            .then((row)=>{
                const id =row.result[0].id
                JwtToken.create(id)
                .then((result)=>{
                    const {refreshtoken,accesstoken}=result;
                    dbQuery(sql2,[refreshtoken,id])
                    .then((row)=>{
                        res.header({
                            'Authorization':`Bearer ${accesstoken}`,
                            'Refresh':`Bearer ${refreshtoken}`
                        });
                    })  
                    .catch((err)=>{
                    }) 
                })                
            })
            .catch((err)=>{
                res.redirect('http://localhost:3000/');
                //추후에 로그인이나 회원가입 페이지가 올것이다
            })
    }as VerifyCallback);   
});

export default router;