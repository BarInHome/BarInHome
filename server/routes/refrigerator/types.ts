//타입의 값들만 받아서 string 배열로 넘긴다
import express from 'express';
// import dbQuery from '../../database/doQuery';
import typesdb from '../data/ingredientData.json'


const router = express.Router();  

router.route('/')
    .get(
        (req,res)=>{
           
            
        });

export default router;

// db에 넣었을때 사용할 라인
            // const query = 'SELECT DISTINCT strType from '//여기에 db 만들고 난 다음에 값 넣자
            // dbQuery(query)
            // .then((result)=>{
            //     res.send(result);
            // })
            // .catch()