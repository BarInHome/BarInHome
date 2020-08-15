import express from 'express';
import typesRouter from './types';
import ingredientsRouter from './ingredients';
import insertRouter from './insert';

const router = express.Router();    

router.use('/types',typesRouter);
router.use('/ingredients',ingredientsRouter);
router.use('/insert',insertRouter);
    

export default router;