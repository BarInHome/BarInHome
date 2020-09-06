import express from 'express';
import refrigeratorRouter from './refrigerator/index';
import userinfoRouter from './userinfo/index';
import { verifyToken } from '../../middleware/jwt/jwtCheck';

const router = express.Router();
router.use(verifyToken);
router.use('/refrigerator',refrigeratorRouter);
router.use('/userinfo',userinfoRouter);

export default router;