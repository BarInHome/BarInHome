import express from 'express';
import dbQuery from '../../database/doQuery';
import {verifyToken} from '../../middleware/jwt/jwtCheck'
const router = express.Router();

interface Intercomment{
    user:string;
    comment:string;
    cocktailname?:string;
}

router.route('/insert')
    .post(
        verifyToken,(req:express.Request,res:express.Response)=>{
        console.log("Insert comment");
        const sql1=`INSERT INTO comment(user,cocktailname,comment) VALUES(?,?,?)`;
        console.log('req.user ',req.user)
        console.log('req.body ',req.body)
        const comment:Intercomment=req.body;
        dbQuery(sql1,[req.user,comment.cocktailname,comment.comment])
            .then((row)=>{
                console.log('success');
                res.send(true);
            }).
            catch((err)=>{
                console.log('bad');
            });
})

router.route('/')
    .post(
        verifyToken,(req:express.Request,res:express.Response)=>{
        console.log("main comment");
        console.log("req.user : ",req.user);
        const sql1=`SELECT user,comment FROM comment WHERE cocktailname=?`;
        
        dbQuery(sql1,[req.body.cocktailname]).
            then((row)=>{
                const comment:Intercomment[] = row.result;
                console.log("comment",comment);
                res.send(comment);
            }).
            catch((err)=>{
            });
})



export default router;