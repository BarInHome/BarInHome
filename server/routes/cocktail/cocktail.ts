import express from 'express';
import cocktailDetailRouter from './cocktailDetail'; 
import dbQuery from '../../database/doQuery';
import { param } from '..';
const router = express.Router();    


router.use('/detail',cocktailDetailRouter);

interface cocktail{
    cocktailName:string;
    ingredient:string;
    maxIngredient:number;
}
interface arrtype {
    [propName: string]: cocktail;
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
                        //console.log("success");
                        //console.log(row.result);
                        let tokens = new Array(row.result.length).fill('?').join(',');
                        let useringredient:Array<string>=[];
                        row.result.forEach(function(element:{ drinkKategorie:string, userId: string}){
                        //    console.log("element : "+element.drinkKategorie);
                        //    console.log(typeof(element.drinkKategorie));
                            useringredient.push(element.drinkKategorie);
                        });
                        
                        const sql2 = `SELECT cocktailName,ingredient,maxIngredient FROM recipe WHERE ingredient IN(${tokens})`;
                        console.log("useringredient:"+useringredient)
                        dbQuery(sql2,useringredient)
                            .then((row)=>{
                                //console.log(row.result);
                                const rescancocktail:Array<cocktail> = row.result;
                                
                                
                                const recommendcocktail = rescancocktail
                                .map(function(val:cocktail){
                                    return val.cocktailName;
                                })
                                .reduce(function(prev:any, cur:string) {
                                    prev[cur] = (prev[cur] || 0) + 1;
                                    return prev;
                                }, {});
                                
                                const cocktailinfo = rescancocktail
                                .map(({cocktailName,ingredient,maxIngredient}) => ({cocktailName,maxIngredient}))
                                .reduce((acc,cur)=>Object.assign(acc,{[cur.cocktailName]:cur}),{});                                
                                
                                
                                console.log("cocktailinfo");
                                console.log(cocktailinfo);
                                console.log("rescancocktails");
                                console.log(rescancocktail);
                                console.log("recommendcocktail");
                                console.log(recommendcocktail);

                                
                                res.send({rescancocktail,recommendcocktail})
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