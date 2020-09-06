import express from 'express';
import jwt, { JsonWebTokenError, VerifyCallback } from 'jsonwebtoken';
import JwtToken from '../../../middleware/jwt/JwtToken'
import dbQuery from '../../../database/doQuery';
import response from '../../../middleware/responseHelper/helper';

const process_env = require('../../../secret');
const router = express.Router();

router.post('/', (req,res) => {
    const refresh = req.cookies['refresh_token'];
    console.log(refresh);
    const sql1='SELECT id FROM userinfo WHERE refresh = ?';
    const sql2='UPDATE userinfo SET refresh = ? WHERE id = ?';

    jwt.verify(refresh, process_env.secret, function(err:JsonWebTokenError) {
        if(err)
            response.Helper.jwtExpired(req,res,err);
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
                            access_token: accesstoken
                        });
                        res.cookie('refresh_token',refreshtoken,{httpOnly:true});
                        res.send();
                    })  
                    .catch((err)=>{
                        response.Helper.mysqlError(req,res,err);
                    }) 
                })                
            })
            .catch((err)=>{
                response.Helper.unauthorized(req,res);
            })
    } as VerifyCallback);   
});

export default router;