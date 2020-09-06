import express from 'express';
import loginRouter from './login';
import passport from '../../middleware/passport/passport';
import JwtToken from  '../../middleware/jwt/JwtToken';
import { verifyToken } from '../../middleware/jwt/jwtCheck';
import response from '../../middleware/responseHelper/helper';
import doQuery from '../../database/doQuery';
const router = express.Router();

router.use('/login',loginRouter);

router.post('/profile', passport.authenticate('jwt' , {session: false}), (req,res) => {
    res.send(req.user);
});

router.post('/signup', passport.authenticate('local-signup', {session: false}) , (req,res) => {
    JwtToken.create(req.user as string)
        .then((result) => { 
            const sql_refreshUpdate = 'UPDATE userinfo SET refresh = ? WHERE id = ?';
            const {accesstoken,refreshtoken} = result; 
            
            doQuery(sql_refreshUpdate, [refreshtoken, req.user])
                .then((result)=>{
                    res.header({
                    'access_token': accesstoken,
                    });
                    res.cookie('refresh_token', refreshtoken, { httpOnly:true });
                    response.Helper.ok(req,res,true);
                })
                .catch((err) => {
                    response.Helper.unauthorized(req,res);
                })
        })
        .catch((err) => {
            response.Helper.serverError(req,res,err);
        })
});

router.post('/logout', verifyToken , (req,res)=>{
    console.log('[Logout user ... ]',req.user);
    const sql_refreshUpdate = 'UPDATE userinfo SET refresh = ? WHERE id = ?';
    doQuery(sql_refreshUpdate, [null, req.user])
        .then(() => {
            res.clearCookie('refresh_token');
            req.logout();
            response.Helper.ok(req,res,true);
        })
        .catch((err) => {
            console.log(err);
            response.Helper.mysqlError(req,res,err);
        })
});


export default router;



// import validate, { IsString, IsIn, IsInt, IsNumber,IsNotEmpty  } from 'class-validator';
// import validator from '../../middleware/validator/validator';

// export class test{
//     constructor(){
//       this.key1 = '';
//       this.key2 = '';
//     }
    
//     @IsNumber()
//     key1: string;
    
//     @IsString()
//     key2: string;
// }

// class test2{
//   constructor(){
//     this.key1 = '';
//     this.key2 = '';
//   }
  
//   @IsNumber()
//   @IsNotEmpty()
//   key1: string;
  
//   @IsString()
//   @IsNotEmpty()
//   key2: string;
// }

// router.use((req,res,next) => validator.paramValidator(req,res,test,next));
// router.route('/test')
//   .get(
//     (req,res) => {
//       res.send('GET OK');
//     } 
//   )
//   .post(
//     (req,res) => {
//       res.send('POST OK');
//     } 
//   )