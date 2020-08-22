import express from 'express';
import loginRouter from './login';
import passport from '../../middleware/passport/passport';

const router = express.Router();    
router.use('/login',loginRouter);

router.route('/signup')
    .post(
        passport.authenticate('local-signup')
    )

router.route('/logout')
    .post(
        (req,res)=>{
            req.logout();
            res.sendStatus(200);        
        }
    )


export default router;