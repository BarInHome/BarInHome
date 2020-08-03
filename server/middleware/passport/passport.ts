import passport from "passport";
import passportLocal from "passport-local";
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth';
import dbQuery from '../../database/doQuery';
import { info } from "console";
import doQuery from "../../database/doQuery";

const secret_config = require('../../secret');
const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

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
    // id 중복 체크
    // if dupled, return done false
    // else 하단 실행

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

  console.log('FaceBook Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'facebook',
    'auth_id': _profile.id,
    'auth_name': _profile.name,
    'auth_email': _profile.id
  }, done);
  
}));

passport.use('google',new GoogleStrategy({
  clientID:secret_config.federation.facebook.client_id,
  clientSecret: secret_config.federation.facebook.secret_id,
  callbackURL: secret_config.federation.facebook.callback_url,
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;

  console.log('Google Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'google',
    'auth_id': _profile.id,
    'auth_name': _profile.name,
    'auth_email': _profile.id1
  }, done);
  
}));

function loginByThirdparty(info:any, done:any) {
  console.log('process : ' + info.auth_type);
  //var stmt_duplicated = 'select *from `user` where `user_id` = ?';
  
  const sql_dupleCheck = `
    SELECT * FROM userinfo WHERE id = ?
  `;

  doQuery(sql_dupleCheck,[info.auth_id])
    .then((row)=>{
      if(row.result.length == 0){
        // 길이가 0, 중복 x , insert(회원가입) 시키고 done로그인 수행
        const sql_insert = `
          INSERT INTO userinfo(id,pw,name,kind) VALUES(?,?,?,?)
        `;

        doQuery(sql_insert,[info.auth_id, info.auth_name,info.auth_type+'PW',info.auth_type])
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

