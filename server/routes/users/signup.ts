import express from 'express';
import doQuery from '../../database/doQuery';
const router = express.Router();


router.route('/')
    .post(
     (req,res)=>{
        console.log('[SIGNUP TRY]',req.body);  
        const {name,id,pw,email} = req.body;

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
                const sql = 'INSERT INTO userinfo(id,pw,name,email) VALUES(?,?,?,?)';
                const params = [id,pw,name,email];

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
