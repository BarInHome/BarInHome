import express from 'express';
import passport from '../../middleware/passport/passport';
const router = express.Router();


router.route('/')
    .post(
        passport.authenticate('local-login',{
        }),(req,res)=>{
          console.log('[Login Success]');
          res.sendStatus(200);
        });

router.route('/check')
     .get(
         (req,res)=>{
            const sessionInfo = req.user;
            if(sessionInfo!=undefined){
                res.send(true);
              }
              else{
                res.send(false);
              }
         }
     )


export default router;


/*
interface Iuser{
    Id: string;
    password: string;
}

export export const signup = (callback: Send) => {
    request.get('https://naver.com', (err, res) => {
        if (err) callback('');
        callback(res.body);
});*/
