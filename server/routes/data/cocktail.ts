import express from 'express';
import apiAxios from '../../OpenAPI/apiAxios';
import fs from 'fs';
import dbQuery from '../../database/doQuery';


const router = express.Router();

interface drink{
    [key:string]:string;
    idDrink:string;
    strDrink:string;
    strTags:string;
    strCategory:string;
    strAlcoholic:string;
    strGlass:string;
    strInstructions:string;
    strDrinkThumb:string;
    strIngredient1:string;
    strIngredient2:string;
    strIngredient3:string;
    strIngredient4:string;
    strIngredient5:string;
    strIngredient6:string;
    strIngredient7:string;
    strIngredient8:string;
    strIngredient9:string;
    strIngredient10:string;
    strIngredient11:string;
    strIngredient12:string;
    strIngredient13:string;
    strIngredient14:string;
    strIngredient15:string;
    strMeasure1:string;
    strMeasure2:string;
    strMeasure3:string;
    strMeasure4:string;
    strMeasure5:string;
    strMeasure6:string;
    strMeasure7:string;
    strMeasure8:string;
    strMeasure9:string;
    strMeasure10:string;
    strMeasure11:string;
    strMeasure12:string;
    strMeasure13:string;
    strMeasure14:string;
    strMeasure15:string;
}

function cocktaildb(drinkresult:drink[],callback?:() => void):void{    
    drinkresult.forEach(function(drink){
        let ingredients:string[]=[];
        let measures:string[]=[];
        for(let property in drink){
            if(property.includes('strIngredient') && drink[property]!=null&&drink[property]!="")
                ingredients.push(drink[property]);
            else if(property.includes('strMeasure') && drink[property]!=null&&drink[property]!="")
                measures.push(drink[property]);
        }
        const padding:Array<string> = new Array(ingredients.length-measures.length);
        padding.fill('0');
        measures = measures.concat(padding);
        for(let index in ingredients){
            dbQuery('INSERT INTO recipe (cocktailName,ingredient,amount,maxIngredient) VALUES (?,?,?,?)',[drink.strDrink,ingredients[index],measures[index],ingredients.length])
            .then((result)=>{
                ingredients=[];
                ingredients.length=0;
                measures=[];
                measures.length=0;
                console.log("good backup");
                if(callback){
                    callback();
                }
            })
            .catch()
        }
    });
}

router.route('/delete')
    .get(
        (req,res)=>{
            dbQuery('DELETE FROM recipe')
            .then((result)=>{
                console.log("delete complete");
            })
            .catch()
        });

router.route('/')
    .get(
        (req,res)=>{        
            const search = ['0','1','2','3','4','5','6','7','8','9',
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


            for(var element of search){
                console.log("for"+element);
                console.log(element);
                apiAxios(0,1,element)
                .then((data:any) =>{
                    const {result,param} = data;
                    if(result){
                        let drinkresult:drink[]=[];
                        for (let {
                            idDrink,
                            strDrink,
                            strTags,
                            strCategory,
                            strAlcoholic,
                            strGlass,
                            strInstructions,
                            strDrinkThumb,
                            strIngredient1,
                            strIngredient2,
                            strIngredient3,
                            strIngredient4,
                            strIngredient5,
                            strIngredient6,
                            strIngredient7,
                            strIngredient8,
                            strIngredient9,
                            strIngredient10,
                            strIngredient11,
                            strIngredient12,
                            strIngredient13,
                            strIngredient14,
                            strIngredient15,
                            strMeasure1,
                            strMeasure2,
                            strMeasure3,
                            strMeasure4,
                            strMeasure5,
                            strMeasure6,
                            strMeasure7,
                            strMeasure8,
                            strMeasure9,
                            strMeasure10,
                            strMeasure11,
                            strMeasure12,
                            strMeasure13,
                            strMeasure14,
                            strMeasure15} of result.data.drinks) {
                            drinkresult.push({
                                idDrink,
                                strDrink,
                                strTags,
                                strCategory,
                                strAlcoholic,
                                strGlass,
                                strInstructions,
                                strDrinkThumb,
                                strIngredient1,
                                strIngredient2,
                                strIngredient3,
                                strIngredient4,
                                strIngredient5,
                                strIngredient6,
                                strIngredient7,
                                strIngredient8,
                                strIngredient9,
                                strIngredient10,
                                strIngredient11,
                                strIngredient12,
                                strIngredient13,
                                strIngredient14,
                                strIngredient15,
                                strMeasure1,
                                strMeasure2,
                                strMeasure3,
                                strMeasure4,
                                strMeasure5,
                                strMeasure6,
                                strMeasure7,
                                strMeasure8,
                                strMeasure9,
                                strMeasure10,
                                strMeasure11,
                                strMeasure12,
                                strMeasure13,
                                strMeasure14,
                                strMeasure15
                            });
                        }
                        //console.log("data.drinks");
                        console.log(param);
                        
                        cocktaildb(drinkresult);
                        // fs.writeFile(`./routes/data/cocktail${param}.json`, JSON.stringify(drinkresult,null,'\t'),function(){console.log("appendgood")});  
                    } 
                });
            };  
            
        }
    )


export default router;