import express from 'express';
import cocktailDetailRouter from './cocktailDetail'; 
import dbQuery from '../../database/doQuery';
import { param } from '..';
const router = express.Router();    


router.use('/detail',cocktailDetailRouter);

router.route('/')
    .get(
        (req,res)=>{
            const sql1 = 'SELECT drinkKategorie,userID FROM refrigerator WEHRE userId=?';
            const params1 = [req.user];
            dbQuery(sql1,params1).
            then((row)=>{
                if(row.result[0]){
                    console.log("success");
                    console.log(typeof(row.result[0]))
                    
                }
                else{
                    // nothing
                    console.log("nothing");
                    res.send('nothing');
                }
            })
    })   


export default router;