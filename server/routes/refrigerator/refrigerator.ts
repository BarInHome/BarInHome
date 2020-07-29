import express from 'express';

const router = express.Router();    

router.route('/')
    .post(
        (req,res)=>{
            req.logout();
            res.sendStatus(200);
        }
    )

export default router;