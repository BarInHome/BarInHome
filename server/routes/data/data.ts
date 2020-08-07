import express from 'express';
import apiAxios from '../../OpenAPI/apiAxios';

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
            apiAxios(0,1,'1').then((data:any) =>{
                console.log("route data");
                console.log(data);
            })
                
            // getData().then(function(data){
            //     console.log('then');
            //     console.log(data);
            // }).catch(function(err){
            //     console.log(err);
            // })
        }
    )


export default router;