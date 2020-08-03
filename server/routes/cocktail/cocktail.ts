import express from 'express';
import cocktailDetailRouter from './cocktailDetail'; 
import dbQuery from '../../database/doQuery';
import { param } from '..';
const router = express.Router();    


router.use('/detail',cocktailDetailRouter);

interface cocktail{
    cocktailName:string,
    ingredient:string,
    maxIngredient:number
}

router.route('/')
    .get(
        (req,res)=>{
            const sql1 = `SELECT drinkKategorie,userId FROM refrigerator WHERE userId = ?`
            const params1 = [req.user];
            // console.log(req);
            // console.log(req.user);
            dbQuery(sql1,params1).
                then((row)=>{
                    if(row.result[0]){
                        console.log("success");
                        console.log(row.result);
                        let tokens = new Array(row.result.length).fill('?').join(',');
                        let userDrink:Array<string>=[];
                        row.result.forEach(function(element:{ drinkKategorie:string, userId: string}){
                            console.log("element : "+element.drinkKategorie);
                            console.log(typeof(element.drinkKategorie));
                            userDrink.push(element.drinkKategorie);
                        });
                        const sql2 = `SELECT cocktailName,ingredient,maxIngredient FROM recipe WHERE ingredient IN(${tokens})`;
                        console.log("userDrink:"+userDrink)
                        dbQuery(sql2,userDrink)
                            .then((row)=>{
                                console.log(row.result);
                                const rescocktail:Array<cocktail> = row.result;
                                console.log("cocktails"+rescocktail)
                                console.log(typeof(rescocktail));
                                rescocktail.forEach(function(cocktail){
                                    console.log(cocktail.cocktailName);
                                    console.log(cocktail.ingredient);
                                    console.log(cocktail.maxIngredient);
                                })
                                res.send(rescocktail)
                            })
                    }
                    else{
                        // nothing
                        console.log("nothing");
                        res.send('nothing');
                    }
                })
    })   


export default router;