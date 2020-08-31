import express from 'express';
import passport from '../../middleware/passport/passport';
import JwtToken from  '../../middleware/jwt/JwtToken';
import doQuery from '../../database/doQuery';
const process_env = require('../../secret');
const router = express.Router();



router.post('/', passport.authenticate('local-login',{session: false}) , (req,res) => {
    JwtToken.create(req.user as string)
        .then((result) => {
            const query = 'UPDATE userinfo SET refresh = ? WHERE id = ?';
            const accesstoken = result.accesstoken;
            const refreshtoken = result.refreshtoken; 
            console.log(accesstoken+"\n"+refreshtoken);
            doQuery(query,[refreshtoken,req.user])
            .then((result)=>{
                res.header({
                    'Authorization':`Bearer ${accesstoken}`
                });
                res.cookie('refresh_token',`Bearer ${refreshtoken}`,{httpOnly:true});
                res.send();
            })
        })
});

router.get('/facebook',passport.authenticate('facebook',{ session: false, scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), (req,res) => {
    console.log("[Facebook Login Success]",req.user);
    JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result.accesstoken}`);
        })
        .catch((err) => {
            res.send(false);
        })
    });

router.get('/google',passport.authenticate('google',{session: false,scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req,res) => {
    console.log("[Google Login Success]",req.user);

    JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result.accesstoken}`);
        })
        .catch((err) => {
            res.send(false);
        })
    });

router.get('/naver',passport.authenticate('naver',{ session: false,scope: ['public_profile', 'email'] }));
router.get('/naver/callback', passport.authenticate('naver'), (req,res) => {
      console.log("[Naver Login Success]",req.user);
  
      JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result.accesstoken}`);
        })
        .catch((err) => {
            res.send(false);
        })
    });

router.get('/kakao',passport.authenticate('kakao',{session: false}),);
router.get('/kakao/callback', passport.authenticate('kakao'), (req,res) => {
    console.log("[Kakao Login Success]",req.user);
    
    JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result.accesstoken}`);
        })
        .catch((err) => {
            res.send(false);
        })
    });

router.get('/admin',(req, res) => {
    // const {adminId, adminPw} = req.body;
    const adminId = 'admin';
    const adminPw = 'admin';
    if( adminId === process_env.admin.id&&
        adminPw === process_env.admin.pw){
            JwtToken.create(process_env.admin.id, process_env.admin.roles)
                .then((result) => {
                    console.log('[Admin User Login]',result);
                    res.redirect(`http://localhost:3000/main?accessToken=${result.accesstoken}`);
                })
                .catch((err) => {
                    console.log('[Admin User Login Faild..]');
                    res.send(false).status(401);
                })
        }
    else{
        res.send(false).status(401);
    }
});

export default router;
