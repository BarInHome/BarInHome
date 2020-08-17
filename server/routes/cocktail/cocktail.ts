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
interface maxinfointerface{
    cocktailName:string;
    maxIngredient:number;
}
interface infointerface{
    [cocktailname:string]:maxinfointerface;
}
interface recommendinterface{
    [cocktailname:string]:number;
}

router.route('/')
    .get(
        (req,res)=>{
            const sql1 = `SELECT drinkKategorie,userId FROM refrigerator WHERE userId = ?`
            const params1 = [req.user];
           
            // console.log(req);
            // console.log(req.user);
            
            //첫번째 유저가 가지고 있는 술들을 가져온다
            dbQuery(sql1,params1).
                then((row)=>{
                    if(row.result[0]){
                        let tokens = new Array(row.result.length).fill('?').join(',');
                        let useringredient:Array<string>=[];
                        row.result.forEach(function(element:{ drinkKategorie:string, userId: string}){
                            useringredient.push(element.drinkKategorie);
                        });
                        
                        const sql2 = `SELECT cocktailName,ingredient,maxIngredient FROM recipe WHERE ingredient IN(${tokens})`;
                        console.log("useringredient:"+useringredient)
                        dbQuery(sql2,useringredient)
                            .then((row)=>{
                                const rescancocktail:cocktail[] = row.result;
                                const recommendmapcocktail = rescancocktail
                                .map(function(val:cocktail){
                                    return val.cocktailName;
                                })
                                const recommendcocktail:recommendinterface = recommendmapcocktail
                                .reduce(function(prev:any, cur:string) {
                                    // if(prev.hasOwnProperty(cur))
                                    prev[cur] = (prev[cur] || 0) + 1;
                                    return prev;
                                }, {});
                                //유저가 가지고 있는 재료들로 만들 수 있는 칵테일 이름들을 가져온다
                                //재료까지 추가해서
                                console.log("recommendcocktail");
                                console.log(recommendcocktail);

                                const cocktailinfo:infointerface = rescancocktail
                                .map(({cocktailName,ingredient,maxIngredient}) => ({cocktailName,maxIngredient}))
                                .reduce((acc,cur)=>Object.assign(acc,{[cur.cocktailName.toString()]:cur}),{});                                
                                //칵테일 이름이 몇개 검색됬는지 카운트한다
                                
                                let incompletecocktail:recommendinterface={}; 

                                for(let element in recommendcocktail){
                                    console.log("element: "+element)
                                    if(recommendcocktail[element]==cocktailinfo[element].maxIngredient-1){
                                        console.log("recommendcocktail[element]: "+recommendcocktail[element]);
                                        incompletecocktail[element]=recommendcocktail[element];
                                        console.log("incomplete:");
                                        console.log(incompletecocktail);
                                        delete recommendcocktail[element];
                                    }
                                    else if(recommendcocktail[element]<cocktailinfo[element].maxIngredient){
                                        console.log("delete: "+recommendcocktail[element]);
                                        delete recommendcocktail[element];
                                    }
                                }
                                //cocktailinfo에서 key값들만 recommendcocktail에 넣고 max갯수와 검색된 갯수 비교해서
                                //자를거 잘라내자
                                
                                console.log("rescancocktails");
                                console.log(rescancocktail);
                                console.log("recommendcocktail");
                                console.log(recommendcocktail);
                                // console.log("cocktailinfo");
                                // console.log(cocktailinfo);
                                // console.log("incompletecocktail");
                                // console.log(incompletecocktail);
                                
                                res.send({rescancocktail,recommendcocktail,incompletecocktail})
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