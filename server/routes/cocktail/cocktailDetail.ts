import express from 'express';
const router = express.Router();    

router.route('/')
    .get(
        (req,res)=>{
            req.logout();
            res.sendStatus(200);
        }
    )

export default router;