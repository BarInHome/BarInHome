import express from 'express';
import loginRouter from './login';
import signupRouter from './signup';
import doQuery from '../../database/doQuery';

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

router.route('/info')
    .post(
        (req,res)=>{
            if(req.user){
                const sql_select = `SELECT * FROM userInfo WHERE id=?`;
                doQuery(sql_select,[req.user])
                    .then((row)=>{
                        if(row.result[0]){
                            res.send({
                                
                                    id:row.result[0].id,
                                    name:row.result[0].name,
                                    email:row.result[0].email,
                                
                            })
                        }
                        else{
                            // internal server error 발생 , no user
                            res.send({
                                data:{
                                    id:'',
                                    name:'',
                                    email:''
                                }
                            }).status(505);
                        }
                    })
            }
            else{
                // 유효하지 않은 세션
                res.send({
                    data:{
                        id:'',
                        name:'',
                        email:''
                    }
                }).status(505);
                // 505 --> client 는 세션이 유효하지 않다는 메세지 출력과 로그인으로 리다이렉트
            }
        }
    )

export default router;