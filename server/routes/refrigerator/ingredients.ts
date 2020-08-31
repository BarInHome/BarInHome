import express from 'express';
import dbQuery from '../../database/doQuery';
import ingredientsdb from '../data/ingredientData.json'

const router = express.Router();  
//넘겨준 타입에 해당되는 재료들만 response 시킨다
router.route('/')
    .post(
        (req,res)=>{
            let ingredients:string[] = []; 
            // for(let element of ingredientsdb){
            //     if(element.strType == req.body.ingredeinttype)
            //         ingredients.push(element.strIngredient)
            // }
            res.send(ingredients);
        });

export default router;