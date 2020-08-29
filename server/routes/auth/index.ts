import express from 'express';
import loginRouter from './login';
import passport from '../../middleware/passport/passport';
import JwtToken from  '../../middleware/jwt/JwtToken';
import validator from '../../middleware/validator/validator';

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

import validate, { IsString, IsIn, IsInt, IsNumber,IsNotEmpty  } from 'class-validator';

export class test{
    constructor(){
      this.key1 = '';
      this.key2 = '';
    }
    
    @IsNumber()
    key1: string;
    
    @IsString()
    key2: string;
}

class test2{
  constructor(){
    this.key1 = '';
    this.key2 = '';
  }
  
  @IsNumber()
  @IsNotEmpty()
  key1: string;
  
  @IsString()
  @IsNotEmpty()
  key2: string;
}

router.use((req,res,next) => validator.paramValidator(req,res,test,next));
router.route('/test')
  .get(
    (req,res) => {
      res.send('GET OK');
    } 
  )
  .post(
    (req,res) => {
      res.send('POST OK');
    } 
  )


export default router;