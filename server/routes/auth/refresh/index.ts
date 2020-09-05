import express from 'express';
import silentRouter from './silent';

const router = express.Router();

router.use('/silent', silentRouter);

export default router;