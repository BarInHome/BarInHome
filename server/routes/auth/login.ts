import express from 'express';
import passport from '../../middleware/passport/passport';
import JwtToken from  '../../middleware/jwt/JwtToken';
import doQuery from '../../database/doQuery';
import response from '../../middleware/responseHelper/helper';
const process_env = require('../../secret');
const router = express.Router();

router.post('/', passport.authenticate('local-login',{session: false}) , (req,res) => {
    JwtToken.create(req.user as string)
        .then((result) => {
            const sql_refreshUpdate = 'UPDATE userinfo SET refresh = ? WHERE id = ?';
            const {accesstoken,refreshtoken} = result; 
            console.log(refreshtoken.length);
            doQuery(sql_refreshUpdate, [refreshtoken, req.user])
                .then((result)=>{
                    res.header({
                    'access_token': accesstoken,
                    });
                    res.cookie('refresh_token', refreshtoken, { httpOnly:true });
                    response.Helper.ok(req,res,true);
                })
                .catch((err) => {
                    console.log(err);
                    response.Helper.unauthorized(req,res);
                })
        })
        .catch((err) => {
            response.Helper.serverError(req,res,err);
        })
});

router.get('/facebook',passport.authenticate('facebook',{ session: false, scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), (req,res) => {
    console.log("[Facebook Login Success]",req.user);
    JwtToken.create(req.user as string)
        .then((result) => {
            const {accesstoken,refreshtoken} = result; 
            res.header({
                access_token: accesstoken
            });
            res.cookie('refresh_token',refreshtoken,{ httpOnly:true });
            res.redirect(`http://localhost:3000/main`);
        })
        .catch((err) => {
            response.Helper.serverError(req,res,err);
        })
    });

router.get('/google',passport.authenticate('google',{session: false,scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req,res) => {
    console.log("[Google Login Success]",req.user);

    JwtToken.create(req.user as string)
        .then((result) => {
            const {accesstoken,refreshtoken} = result; 
            res.header({
                access_token: accesstoken
            });
            res.cookie('refresh_token',refreshtoken,{ httpOnly:true });
            res.redirect(`http://localhost:3000/main`);
        })
        .catch((err) => {
            response.Helper.serverError(req,res,err);
        })
    });

router.get('/naver',passport.authenticate('naver',{ session: false,scope: ['public_profile', 'email'] }));
router.get('/naver/callback', passport.authenticate('naver'), (req,res) => {
    console.log("[Naver Login Success]",req.user);
  
    JwtToken.create(req.user as string)
      .then((result) => {
          const {accesstoken,refreshtoken} = result; 
          res.header({
              access_token: accesstoken
          });
          res.cookie('refresh_token',refreshtoken,{ httpOnly:true });
          res.redirect(`http://localhost:3000/main`);
      })
      .catch((err) => {
          response.Helper.serverError(req,res,err);
      })
  });

router.get('/kakao',passport.authenticate('kakao',{session: false}),);
router.get('/kakao/callback', passport.authenticate('kakao'), (req,res) => {
    console.log("[Kakao Login Success]",req.user);
    
    JwtToken.create(req.user as string)
        .then((result) => {
            const {accesstoken,refreshtoken} = result; 
            res.header({
                access_token: accesstoken
            });
            res.cookie('refresh_token',refreshtoken,{ httpOnly:true });
            res.redirect(`http://localhost:3000/main`);
        })
        .catch((err) => {
            response.Helper.serverError(req,res,err);
        })
    });

router.get('/admin',(req, res) => {
    // const {adminId, adminPw} = req.body;
    const adminId = 'admin';
    const adminPw = 'admin';
    if( adminId === process_env.admin.id&&
        adminPw === process_env.admin.pw){
            JwtToken.create(req.user as string)
                .then((result) => {
                    const {accesstoken,refreshtoken} = result; 
                    res.header({
                        access_token: accesstoken
                    });
                    res.cookie('refresh_token',refreshtoken,{ httpOnly:true });
                    res.redirect(`http://localhost:3000/main`);
                })
                .catch((err) => {
                    response.Helper.serverError(req,res,err);
                })
        }
    else{
        response.Helper.unauthorized(req,res);
    }
});

export default router;
