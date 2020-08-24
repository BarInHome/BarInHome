import express from 'express';
import loginRouter from './login';
import signupRouter from './signup';

const router = express.Router();    
// router.use('/login',loginRouter);
// router.use('/signup',signupRouter);

router.route('/logout')
    .post(
        (req,res)=>{
            req.logout();
            res.sendStatus(200);        
        }
    )


export default router;