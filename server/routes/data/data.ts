import express from 'express';
import apiAxios from '../../OpenAPI/apiAxios';
const fs = require ('fs');

const router = express.Router();

interface drink{
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
    // [key:string]:string;
}

// function getData() {
//     return new Promise((resolve, reject)=>{
//         const search=['0','1','2','3','4','5','6','7','8','9','0'];
//         console.log("resolve");
         
//         resolve(data);
//     });
//   }  

router.route('/')
    .get(
        (req,res)=>{        
            //   
            const search = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            
            // fs.writeFile('./routes/data/cocktail.json','hello',function(err:Error){
            //     if (err === null){
            //         console.log('success'); 
            //     } 
            //     else {
            //         console.log('fail'); 
            //     } 
            // });  

            for(var element of search){
                console.log("for"+element);
                console.log(element);
                apiAxios(0,1,element)
                .then((data:any) =>{
                    const {result,param} = data;
                    if(result){
                        let drinkresult:drink[]= result.data.drinks;
                        console.log("data.drinks");
                        // console.log(data.drinks);
                        
                        console.log(param);
                        
                        fs.writeFile(`./routes/data/cocktail${param}.json`, JSON.stringify(drinkresult,null,'\t'),function(){console.log("appendgood")});  
                    } 
                });
            };        
            // console.log("result data");
            // console.log(result); 
                        
            // getData().then(function(data){
            //     console.log('then');
            //     console.log(data);
            // }).catch(function(err){
            //     console.log(err);
            // })
        }
    )


export default router;