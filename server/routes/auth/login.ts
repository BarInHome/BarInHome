import express from 'express';
import passport from '../../middleware/passport/passport';
import JwtToken from  '../../middleware/jwt/JwtToken';
const router = express.Router();

router.post('/', passport.authenticate('local-login',{session: false}) , (req,res) => {
    JwtToken.create(req.user as string)
        .then((result) => {
            res.header({
                'Authorization':`Bearer ${result.accesstoken}`,
                'Refresh':`Bearer ${result.refreshtoken}`
            });
        })
});

router.get('/facebook',passport.authenticate('facebook',{ scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', (req,res) => {
    console.log("[Facebook Login Success]",req.user);
    JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result}`);
        })
        .catch((err) => {
            res.send(false);
        })
}));

router.get('/google',passport.authenticate('google',{ scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', (req,res) => {
    console.log("[Google Login Success]",req.user);

    JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result}`);
        })
        .catch((err) => {
            res.send(false);
        })
}));

router.get('/naver',passport.authenticate('naver',{ scope: ['public_profile', 'email'] }));
router.get('/naver/callback', passport.authenticate('naver', (req,res) => {
      console.log("[Naver Login Success]",req.user);
  
      JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result}`);
        })
        .catch((err) => {
            res.send(false);
        })
}));

router.get('/kakao',passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', (req,res) => {
    console.log("[Kakao Login Success]",req.user);
    
    JwtToken.create(req.user as string)
        .then((result) => {
            res.redirect(`http://localhost:3000/main?accessToken=${result}`);
        })
        .catch((err) => {
            res.send(false);
        })
}));

export default router;
