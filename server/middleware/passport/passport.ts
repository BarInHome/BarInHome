import passport from "passport";
import dbQuery from '../../database/doQuery';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as NaverStrategy } from "passport-naver";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as KakaoStrategy } from "passport-kakao";

const secret_config = require('../../secret');

passport.serializeUser<any, any>((id, done) => {
  console.log("serializeUser : "+id);
  done(undefined, id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser : "+id);
  done(undefined,id);
});

passport.use('local-login',new LocalStrategy({ usernameField: "id" ,passwordField:"pw"}, (id:string, pw:string, done: any) => { 
  const sql = "SELECT * FROM userinfo WHERE id = ? && pw = ?";
  const params = [id,pw];
  
  dbQuery(sql,params).
    then((row)=>{
      if(row.result[0]){
        // login success
        console.log("[LOGIN SUCCESS]");
        return done(undefined, id);
      }
      else{
        return done(false,undefined);
      }
    });
}));

passport.use('local-signup',new LocalStrategy({ usernameField: "id" ,passwordField:"pw"}, (id:string, pw:string, done: any) => { 
    const sqlDupleCheck = 'SELECT * FROM userinfo WHERE id = ?';
    dbQuery(sqlDupleCheck,[id])
      .then((row)=>{
        if(row.result[0]){
          //dupeld
          console.log("[SIGNUP ERROR] Try Again");
          //status == 401
          return done(false);
        }
        else{
          //ok
          const sql = 'INSERT INTO userinfo(id,pw,name) VALUES(?,?,"")';
          const params = [id,pw];

          dbQuery(sql,params) 
          .then((row)=>{
            return done(undefined,id);
          })
          .catch((err)=>{
            console.log(err);
            return done(false);
          })
        }
      })
}));


passport.use('facebook',new FacebookStrategy({
  clientID:secret_config.federation.facebook.client_id,
  clientSecret: secret_config.federation.facebook.secret_id,
  callbackURL: secret_config.federation.facebook.callback_url,
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;
  console.log("facebook profile",profile);
  // name : string , id : string
  console.log('FaceBook Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'facebook',
    'auth_id': _profile.id,
    'auth_name': _profile.name,
    'auth_email': _profile.id
  }, done);
  
}));

passport.use('google',new GoogleStrategy({
  clientID:secret_config.federation.google.client_id,
  clientSecret: secret_config.federation.google.secret_id,
  callbackURL: secret_config.federation.google.callback_url,
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;
  // name : string , email : string 
  console.log('Google Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'google',
    'auth_id': _profile.email,
    'auth_name': _profile.name,
    'auth_email': _profile.email
  }, done);
  
}));

passport.use('naver',new NaverStrategy({
  clientID:secret_config.federation.naver.client_id,
  clientSecret: secret_config.federation.naver.secret_id,
  callbackURL: secret_config.federation.naver.callback_url,
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;
  // email: string; nickname: string; profile_image: string; age: number; birthday: any; id: string;
  console.log('Naver Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'naver',
    'auth_id': _profile.id,
    'auth_name': _profile.nickname,
    'auth_email': _profile.email
  }, done);
  
}));

passport.use('kakao',new KakaoStrategy({
  clientID:secret_config.federation.kakao.client_id,
  clientSecret: "",
  callbackURL: secret_config.federation.kakao.callback_url
}, (accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;
  // id : string
  console.log('Kakao Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'kakao',
    'auth_id': _profile.id,
    'auth_name': _profile.nickname,
    'auth_email': _profile.email
  }, done);
  
}));

function loginByThirdparty(info:any, done:any) {
  console.log('process : ' + info.auth_type);
  //var stmt_duplicated = 'select *from `user` where `user_id` = ?';
  
  const sql_dupleCheck = `
    SELECT * FROM userinfo WHERE id = ?
  `;

  dbQuery(sql_dupleCheck,[info.auth_id])
    .then((row)=>{
      if(row.result.length == 0){
        // 길이가 0, 중복 x , insert(회원가입) 시키고 done로그인 수행
        const sql_insert = `
          INSERT INTO userinfo(id,pw,name,kind) VALUES(?,?,?,?)
        `;

        dbQuery(sql_insert,[info.auth_id, info.auth_name,info.auth_type+'PW',info.auth_type])
          .then((row)=>{
            console.log('info.auth_id',info.auth_id);
            return done(null,info.auth_id);  
          })
          .catch((err)=>{
            return done(false);
          })
      }
      else{
        console.log('row.result[0].id)',row.result[0].id);
        done(null,row.result[0].id);
      }
    })  
}

export default passport;

