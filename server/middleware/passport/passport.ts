import passport from "passport";
import passportLocal from "passport-local";
import dbQuery from '../../database/doQuery';

const LocalStrategy = passportLocal.Strategy;

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

export default passport;