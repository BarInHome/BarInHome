import passport from "passport";
import dbQuery from '../../database/doQuery';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as NaverStrategy } from "passport-naver";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as KakaoStrategy } from "passport-kakao";
import verifications from './verifications';

const process_env = require('../../secret');
const ExtractJWT = passportJWT.ExtractJwt;
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
/*
  1) Facebook : id, name            + email
  2) Google   : id, name, email     
  3) Naver    : id, email           + name
  4) Kakao    : id                  + id , email
*/

passport.use('jwt' , new JwtStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),     
  secretOrKey   : process_env.secret,
},verifications.tokenValidateCheck));

passport.use('local-login', new LocalStrategy({
    usernameField: "id" ,
    passwordField: "pw",
    passReqToCallback: true
  },verifications.localLogin));

passport.use('local-signup', new LocalStrategy({
    usernameField: "id" ,
    passwordField: "pw",
    passReqToCallback: true
  },
  verifications.localSignup
));

passport.use('facebook',new FacebookStrategy({
  clientID:process_env.federation.facebook.client_id,
  clientSecret: process_env.federation.facebook.secret_id,
  callbackURL: process_env.federation.facebook.callback_url,
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
  clientID:process_env.federation.google.client_id,
  clientSecret: process_env.federation.google.secret_id,
  callbackURL: process_env.federation.google.callback_url,
  
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;
  // name : string , email : string 
  console.log('Google Login Strategy',_profile);

  loginByThirdparty({
    'auth_type': 'google',
    'auth_id': _profile.sub,
    'auth_name': _profile.name,
    'auth_email': _profile.email
  }, done);
  
}));

passport.use('naver',new NaverStrategy({
  clientID:process_env.federation.naver.client_id,
  clientSecret: process_env.federation.naver.secret_id,
  callbackURL: process_env.federation.naver.callback_url,
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
  clientID:process_env.federation.kakao.client_id,
  clientSecret: "",
  callbackURL: process_env.federation.kakao.callback_url,
  
}, (accessToken, refreshToken, profile, done) => {
  const _profile = profile._json;
  // id : string
  console.log('Kakao Login Strategy',_profile);
  
  loginByThirdparty({
    'auth_type': 'kakao',
    'auth_id': _profile.id,
    'auth_name': _profile.id,
    'auth_email': _profile.id
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
          INSERT INTO userinfo(id,pw,name,kind,email) VALUES(?,?,?,?,?)
        `;

        dbQuery(sql_insert,[info.auth_id,info.auth_type+'PW',info.auth_name,info.auth_type,info.auth_email])
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

