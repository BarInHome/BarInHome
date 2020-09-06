import express from 'express';
import dbQuery from '../../database/doQuery';
import { param } from '..';
import session from 'express-session';
import apiAxios from '../../OpenAPI/apiAxios';
import { AxiosError } from 'axios';
import response from '../../middleware/responseHelper/helper';
const router = express.Router();    

interface poscocktailinfo{
    strdrink:string;
    strdrinkthumb:string;
    stringredient:string[];
    strmeasure:string[];
    strinstructions:string;
    flag?:boolean[];
} 
  
interface poscocktail{
    poscocktailinfo:poscocktailinfo[];
    implecocktailinfo:poscocktailinfo[];
}

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
    .post(
        (req:express.Request,res:express.Response)=>{
            console.log("post");
            const sql1 = `SELECT drinkKategorie,userId FROM refrigerator WHERE userId = ?`;
            const params1 = 'ididid';
            // console.log(req.user);
            
            //첫번째 유저가 가지고 있는 술들을 가져온다
            dbQuery(sql1,[params1]).
                then((row)=>{
                    
                    if(row.result[0]){
                        let tokens = new Array(row.result.length).fill('?').join(',');
                        let useringredient:string[]=[];
                        row.result.forEach(function(element:{ drinkKategorie:string, userId: string}){
                            useringredient.push(element.drinkKategorie);
                        });
                        const sql2 = `SELECT cocktailName,ingredient,maxIngredient FROM recipe WHERE ingredient IN(${tokens})`;
                        console.log("useringredient:",useringredient)
                        dbQuery(sql2,useringredient)
                            .then((row)=>{
                                const rescancocktail:cocktail[] = row.result;
                                //유저가 가지고 있는 재료들로 만들 수 있는 칵테일 이름들을 가져온다
                                //재료까지 추가해서
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
                                //recommendcocktail 칵테일 이름이 몇개 검색됬는지 카운트한다
                                // console.log("recommendcocktail");
                                // console.log(recommendcocktail);

                                //비교하기 쉽게 maxingredient ingredient cocktailname만 뽑아온다
                                const cocktailinfo:infointerface = rescancocktail
                                .map(({cocktailName,ingredient,maxIngredient}) => ({cocktailName,maxIngredient}))
                                .reduce((acc,cur)=>Object.assign(acc,{[cur.cocktailName.toString()]:cur}),{});                                
                                
                            
                                //cocktailinfo에서 key값들만 recommendcocktail에 넣고 max갯수와 검색된 갯수 비교해서
                                //recommend 잘라내자
                                let incompletecocktail:recommendinterface={}; 
                                for(let element in recommendcocktail){
                                    // console.log("element: "+element)
                                    if(recommendcocktail[element]==cocktailinfo[element].maxIngredient-1){
                                        // console.log("recommendcocktail[element]: "+recommendcocktail[element]);
                                        incompletecocktail[element]=recommendcocktail[element];
                                        // console.log("incomplete:");
                                        // console.log(incompletecocktail);
                                        delete recommendcocktail[element];
                                    }
                                    else if(recommendcocktail[element]<cocktailinfo[element].maxIngredient){
                                        // console.log("delete: "+recommendcocktail[element]);
                                        delete recommendcocktail[element];
                                    }
                                }
                                
                                // console.log("rescancocktails\n",rescancocktail);
                                // console.log("recommendcocktail\n",recommendcocktail);
                                // console.log("cocktailinfo\n",cocktailinfo);
                                // console.log("incompletecocktail\n",incompletecocktail);
                               
                                // incompletecocktail과 recommendcocktail을 api로 보내서 파싱한다 그뒤에 정보 보냄
                                let reccocktail:string[]=[];
                                for(let prop in recommendcocktail){reccocktail.push(prop);}
                                let incomcocktail:string[]=[];
                                for(let prop in incompletecocktail){incomcocktail.push(prop);}

                                console.log("reccocktails\n",reccocktail);
                                console.log("incomcocktails\n",incomcocktail);
                               
                                
                                let poscocktail:poscocktail= {} as poscocktail;
                                let pos_poscocktail:poscocktailinfo[]=[];
                                let pos_implecocktail:poscocktailinfo[]=[];

                                console.log("rec length: ",reccocktail.length,"incom length: ",incomcocktail.length)
                                let count:number=reccocktail.length+incomcocktail.length;
                                reccocktail.forEach(function(recommend:string){
                                    apiAxios(0,0,recommend)
                                    .then((data:any)=>{
                                        const{result} = data;
                                        const drinks = result.data.drinks[0];
                                        let poscocktailinfo:poscocktailinfo= {} as poscocktailinfo;;//안으로 넣어야함
                                        const{strDrink,strInstructions,strDrinkThumb}=drinks;
                                        poscocktailinfo.strdrink=strDrink;
                                        poscocktailinfo.strinstructions=strInstructions;
                                        poscocktailinfo.strdrinkthumb=strDrinkThumb;
                                        let ingredient:string[]=[];
                                        let measure:string[]=[];
                                        for(let element in drinks){
                                            if (element.indexOf("strIngredient")>=0 && drinks[element]!=null && drinks[element]!=""){
                                                ingredient.push(drinks[element]);
                                            }else if(element.indexOf("strMeasure")>=0 && drinks[element]!=null && drinks[element]!=""){
                                                measure.push(drinks[element]);
                                            }else if(element=="dateModified"){
                                                console.log("last save ");
                                                console.log("ingredient ",ingredient,"measure ",measure)
                                                poscocktailinfo.stringredient=ingredient;
                                                poscocktailinfo.strmeasure=measure;
                                            }
                                        }
                                        count--;
                                        pos_poscocktail.push(poscocktailinfo);
                                        if(count<=0){
                                            poscocktail.poscocktailinfo=pos_poscocktail;
                                            poscocktail.implecocktailinfo=pos_implecocktail;
                                            console.log(poscocktail);
                                            response.Helper.ok(req,res,poscocktail);
                                        }
                                    })
                                    .catch((err:AxiosError)=>{
                                        if(reccocktail.length==0){console.log("reccocktail is null")}
                                    })
                                });
                                incomcocktail.forEach(function(incomplete:string){
                                    // console.log("incomplete ",incomplete);
                                    apiAxios(0,0,incomplete)
                                    .then((data:any)=>{
                                        const{result} = data;
                                        const drinks = result.data.drinks[0];
                                        // console.log("result ",drinks);
                                        let impletecocktailinfo:poscocktailinfo={} as poscocktailinfo;//안으로 넣어야함
                                        const{strDrink,strInstructions,strDrinkThumb}=drinks;
                                        // console.log("strDrink ",strDrink,"strInstructions ",strInstructions,"strDrinkThumb ",strDrinkThumb);
                                        impletecocktailinfo.strdrink=strDrink; 
                                        impletecocktailinfo.strinstructions=strInstructions;
                                        impletecocktailinfo.strdrinkthumb=strDrinkThumb;
                                        let ingredient:string[]=[];
                                        let measure:string[]=[];
                                        let flag:boolean[]=[];
                                        for(let element in drinks){
                                            console.log("implete key ",element)
                                            
                                            if (element.indexOf("strIngredient")>=0 && drinks[element]!=null && drinks[element]!=""){
                                                // console.log("implete ingredient push",element,drinks[element]);
                                                ingredient.push(drinks[element]);
                                                console.log(drinks[element],"ingredient",ingredient);
                                                if(useringredient.indexOf(drinks[element])>=0){
                                                    console.log("flag ture");
                                                    flag.push(true);
                                                }else{
                                                    console.log("flag false");
                                                    flag.push(false);
                                                }
                                            }
                                            else if(element.indexOf("strMeasure")>=0 && drinks[element]!=null && drinks[element]!=""){
                                                // console.log("implete measure push",element,drinks[element]);
                                                measure.push(drinks[element])
                                                console.log(drinks[element],"measure",measure);
                                            }
                                            else if(element=="dateModified"){
                                                console.log("last save ");
                                                console.log("ingredient ",ingredient,"measure ",measure)
                                                impletecocktailinfo.stringredient=ingredient;
                                                impletecocktailinfo.strmeasure=measure;
                                                impletecocktailinfo.flag=flag;
                                            }
                                        }
                                        count--;
                                        console.log("impletecocktailinfo ",impletecocktailinfo)
                                        pos_implecocktail.push(impletecocktailinfo);
                                        // console.log("poscocktail ",poscocktail);
                                        if(count<=0){
                                            poscocktail.poscocktailinfo=pos_poscocktail;
                                            poscocktail.implecocktailinfo=pos_implecocktail;
                                            console.log("finally : ",poscocktail);
                                            response.Helper.ok(req,res,poscocktail);
                                        }
                                    })
                                    .catch((err:AxiosError)=>{
                                        if(incomcocktail.length==0){console.log("incomcocktail is null")}
                                    })
                                });

                                // res.send({rescancocktail,recommendcocktail,incompletecocktail})
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