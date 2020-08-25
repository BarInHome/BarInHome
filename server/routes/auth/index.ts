import express from 'express';
import loginRouter from './login';
import passport from '../../middleware/passport/passport';
import JwtToken from  '../../middleware/jwt/JwtToken';

const router = express.Router();    
router.use('/login',loginRouter);

router.post('/profile', passport.authenticate('jwt' , {session: false}), (req,res) => {
    res.send(req.user);
});

router.post('/signup', passport.authenticate('local-signup', {session: false}) , (req,res) => {
    JwtToken.create(req.user as string)
        .then((result) => { 
            res.json({
                accessToken: result.token,
                status: 201
            })
        })
});

router.post('/logout', (req,res)=>{
    req.logout();
    res.sendStatus(200);        
});

export default router;