import express from 'express';
//import passport from '../passport/passport'
//import doQuery from '../mySQL/dpQuery';

import loginRouter from './login';
import signupRouter from './signup';

/*
const mysql = require('../config/database')();
const connection = mysql.init();
mysql.test_open(connection);
*/

const router = express.Router();    
router.use('/login',loginRouter);
router.use('/signup',signupRouter);

router.route('/logout')
    .post(
        (req,res)=>{
            req.logout();
            res.sendStatus(200);        
        }
    )

export default router;