import express from 'express';
import doQuery from '../../database/doQuery';
import passport from 'passport-local';
import jwt from 'passport-jwt';

import Google from 'passport-google-oauth20';
import Naver from 'passport-naver';
import FaceBook from 'passport-facebook';
import Kakao from 'passport-kakao';

const tokenValidateCheck = (
    payload: any, 
    done: jwt.VerifiedCallback
): void => {
    const id = payload.id;
    const roles = payload.roles;
    console.log(id);

    if(roles === 'Admin'){
      done(null, id);
    }
    else{
      if(id){
        const sql= "SELECT * FROM userinfo WHERE id = ?";
        doQuery(sql,[id])
            .then((row) => {
              console.log("success");
              if(row.result[0]) return done(null , id);
            })
            .catch((err) => {
              console.log("fail");
              return done(false);
            })
      } 
    else{
        return done(false);
      }
    }
}

const localLogin = (
    req: express.Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: passport.IVerifyOptions) => void
  ): void => {
    console.log('[Local Login Varification]');
    console.log(username);
    const id = username ; const pw = password;
    const sql = "SELECT * FROM userinfo WHERE id = ? && pw = ?";
    const params = [id,pw];
    
    doQuery(sql,params).
        then((row)=>{
            if(row.result[0]){
              console.log("local login verification");
              console.log(id);
              return done(null, id);
            }
            else{
              return done(false, null);
            }
        })
        .catch((err) => {
          console.log(err);
        })
    };

const localSignup = (
        req: express.Request,
        username: string,
        password: string,
        done: (error: any, user?: any, options?: passport.IVerifyOptions) => void
  ): void => {
    console.log('[Local Signup Varification]');
    const {name,id,pw,email} = req.body;

    const sqlDupleCheck = 'SELECT * FROM userinfo WHERE id = ?';
    doQuery(sqlDupleCheck,[id])
       .then((row)=>{
           if(row.result[0]){
           //dupeld
            console.log("[SIGNUP ERROR] Try Again");
           //status == 401
            return done(new Error('Exist User'));
           }
           else{
           //ok
           const sql = 'INSERT INTO userinfo(id,pw,name,email) VALUES(?,?,?,?)';
           const params = [id,pw,name,email];

           doQuery(sql,params) 
            .then((row)=>{
               return done(null, id);
           })
           .catch((err)=>{
               console.log(err);
               return done(false);
            })
        }
   })
};   

const facebook = (
    accessToken: string,
    refreshToken: string, profile: FaceBook.Profile,
    done: FaceBook.VerifyFunction
): void => {
    loginByThirdparty({
        'auth_type': 'facebook',
        'auth_id': profile.id,
        'auth_name': profile.name,
        'auth_email': profile.id
      }, done);
}

const google =  (
    accessToken: string,
    refreshToken: string, profile: Google.Profile,
    done: Google.VerifyCallback
): void => {
    loginByThirdparty({
        'auth_type': 'google',
        'auth_id': profile.emails,
        'auth_name': profile.name,
        'auth_email': profile.emails
      }, done);
}

const naver :Naver.VerifyFunction = (accessToken, refreshToken, profile, done) => {
    loginByThirdparty({
        'auth_type': 'naver',
        'auth_id': profile.id,
        'auth_name': profile.name,
        'auth_email': profile.emails
      }, done);
}

const kakao: Kakao.VerifyFunction = (accessToken, refreshToken, profile, done) => {
    loginByThirdparty({
        'auth_type': 'kakao',
        'auth_id': profile.id,
        'auth_name': profile.id,
        'auth_email': profile.id
      }, done);
}

function loginByThirdparty(info:any, done:any) {
  const sql_dupleCheck = `
    SELECT * FROM userinfo WHERE id = ?
  `;

  doQuery(sql_dupleCheck,[info.auth_id])
    .then((row)=>{
      if(row.result.length == 0){
        // 길이가 0, 중복 x , insert(회원가입) 시키고 done로그인 수행
        const sql_insert = `
          INSERT INTO userinfo(id,pw,name,kind,email) VALUES(?,?,?,?,?)
        `;
        
        doQuery(sql_insert,[info.auth_id,info.auth_type+'PW',info.auth_name,info.auth_type,info.auth_email])
          .then((row)=>{
            return done(null,info.auth_id);  
          })
          .catch((err)=>{
            return done(false);
          })
      }
      else{
        console.log('row.result[0].id)',row.result[0].id);
        return done(null,row.result[0].id);
      }
    })  
}

export default {
    localLogin,
    localSignup,
    tokenValidateCheck,
    google , facebook , 
    naver , kakao,
}