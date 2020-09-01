//타입의 값들만 받아서 string 배열로 넘긴다
import express from 'express';
import passport from '../../middleware/passport/passport';
// import dbQuery from '../../database/doQuery';
import ingredientList from '../../data/ingredient.json'


const router = express.Router();  

router.post('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    console.log(req.header('Authorization'));
    console.log("hello");
    let typeset = new Set<string>();
    //typesdb 반복하면서 typeset에 넣는다
    for(let db of ingredientList){
        if (db.strType != null)
            typeset.add(db.strType);
    } 
    const type = [...typeset];
    console.log(type);
    res.send(type);
});

export default router;

// 

// db에 넣었을때 사용할 라인
            // const id = "자운"
            // const query = 'SELECT * from WHERE id = ?'//여기에 db 만들고 난 다음에 값 넣자
            // dbQuery(query,[id])
            // .then((result)=>{
            //     res.send(result);
            // })
            // .catch()