import express from 'express';
import passport from '../../middleware/passport/passport';
const router = express.Router();


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
             console.log('[Login Check..]');
             res.sendStatus(200);
         }
     )

export default router;