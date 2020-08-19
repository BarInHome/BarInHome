import express from 'express';
import refrigeratorRouter from './refrigerator/index';
import userinfoRouter from './userinfo/index';

const router = express.Router();    
router.use('/refrigerator',refrigeratorRouter);
router.use('/userinfo',userinfoRouter);


export default router;