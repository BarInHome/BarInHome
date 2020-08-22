import express from 'express';
import doQuery from '../../database/doQuery';

const localLogin = (
    req : express.Request,
    done: (error: any, user?: any, options?: any) => void,
  ): void => {
    console.log('[Local Login Varification]',req.body);

    const {id, pw} = req.body;
    const sql = "SELECT * FROM userinfo WHERE id = ? && pw = ?";
    const params = [id,pw];
    
    doQuery(sql,params).
        then((row)=>{
            if(row.result[0]){
                // login success
                console.log("[Local LOGIN SUCCESS]");
                return done(null, id);
            }
            else{
                return done(false, null);
            }
        });
    };

const localSignup = (
    req : express.Request,
    done: (error: any, user?: any, options?: any) => void,
  ): void => {
    console.log('[Local Signup Varification]',req.body);

    const {name,id,pw,email} = req.body;

    const sqlDupleCheck = 'SELECT * FROM userinfo WHERE id = ?';
    doQuery(sqlDupleCheck,[id])
       .then((row)=>{
           if(row.result[0]){
           //dupeld
            console.log("[SIGNUP ERROR] Try Again");
           //status == 401
            return done(false);
           }
           else{
           //ok
           const sql = 'INSERT INTO userinfo(id,pw,name,email) VALUES(?,?,?,?)';
           const params = [id,pw,name,email];

           doQuery(sql,params) 
            .then((row)=>{
               return done(null, 'ok');
           })
           .catch((err)=>{
               console.log(err);
               return done(false);
            })
           }
   })
};   


export default {
    localLogin,
    localSignup,

}