import express from 'express';
import dbQuery from '../../database/doQuery';
import session from 'express-session';

const router = express.Router();  


router.route('/')
    .post(
        (req,res)=>{
            const ingredient = req.body.ingredient;
            const ingredienttype = req.body.ingredienttype;
            
            const query = 'INSERT INTO refrigerator(drinkType,drinkKategorie,userId) VALUES(?,?,?)';
            const params = [ingredient,ingredienttype,req.user];
            dbQuery(query,params)
            .then((row)=>{
                console.log("instert complete");
                res.send(true);
            })
            .catch((err)=>{
                console.log(err);
                return res.sendStatus(400);
            })
        });

export default router;
