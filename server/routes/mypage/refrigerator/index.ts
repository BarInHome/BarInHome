import express, { Router } from 'express';
import ingredientList from '../../../data/ingredient.json';
import doQuery from '../../../database/doQuery';

const router = express.Router();

/*
    구현기능

     내 냉장고 탭
    1. 재료 검색
    2. 재료 추가
    3. 재료 삭제
*/

// 재료 검색
interface Ingredient{
    idIngredient:string;
    strDescription:string|null;
    strIngredient : string|null;
    strType : string|null;
    strAlcohol : string|null;
    strABV:string|null;
}

/*
    유저 아이디로 유저가 가진 재료들을 DB 검색 리턴
    input   :   userid --> req.user
    output  :   Ingredient[]
*/
router.route('/findAll')
    .get(
        (req,res) => {
            const sql_findall = `
                SELECT strIngredient,strType,strAlcohol FROM refrigerator WHERE userid = ?
            `;

            doQuery(sql_findall,[req.user])
                .then((data) => {
                    console.log(data);
                    res.status(200).send(data.result);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send(false);
                })
        }
    )

/*
    주어진 조건이 일치하는 모든 결과를 JSON 파일에서 검색 후 리턴
    input   :   param1: string|null, param1|null: string, ...
    output  :   Ingredient[]

    조건은 null 을 허용하며 입력된 조건에서 null 을 제외시켜 나머지와 최대로 일치하는
    결과를 검색해 리턴한다.
*/
router.route('/search')
    .get(   // get 으로 바꾸어야함
        (req,res) => {
            const typeList = ingredientList.map((item)=> item.strType);
            const typeListUnique = new Set(typeList);
            console.log(typeListUnique);
        }
    )
    .post(  
        async (req,res) => { 
            const result: Ingredient[] = [];                // return 할 배열
            const searchFiled = Object.entries(req.body);   // 주어진 조건을 key - value 쌍의 배열로 맵핑

            for(let k = 0; k < searchFiled.length; ++k){    // 해당 조건 배열에서 '' 값을 추출해 삭제
                if(searchFiled[k][1] === ""){
                    searchFiled.splice(k,1);
                    --k;
                }
            }

            for(let i = 0; i < ingredientList.length ; ++i){    // JSON 파일에서 정제된 조건문과 최대로 일치하는 값들을 추출, 저장
                let matchCount = 0; 
                for(let j = 0; j < searchFiled.length; ++j){
                    const key: 'strAlcohol'|'strType' = searchFiled[j][0] as 'strAlcohol'|'strType';
                    if( ingredientList[i][key] === searchFiled[j][1]) ++matchCount;

                    if(j === searchFiled.length - 1 && matchCount === searchFiled.length) result.push(ingredientList[i]);
                }

                if(i === ingredientList.length - 1){
                    res.status(200).send(result);
                }
            }
        }
    )

/*
    선택된 재료들을 모두 DB 에 insert
    input   :   param1: Ingredint, param2: Ingredint, ...
    output  :   boolean

    선택된 재료들을 모두 한번에 insert 한다.
*/
router.post('/add', (req,res) => {
    const addList: Ingredient[] = Object.values(req.body);
    console.log('addList',addList);
    if(addList.length > 0){
        let sql_add = `INSERT into refrigerator (userid,idIngredient,strIngredient,strDescription,strType,strAlcohol,strABV) VALUES`;
        const sql_values:any[] = [];
        for(let i = 0; i < addList.length; ++i){
            if(i < addList.length - 1){
                sql_add = sql_add.concat(`(?,?,?,?,?,?,?),`);
            }
            else{
                sql_add = sql_add.concat(`(?,?,?,?,?,?,?)`);
            }
            sql_values.push(req.user,...Object.values(addList[i]));
        }
            
        doQuery(sql_add,sql_values)
            .then(() => {
                res.status(201).send(true);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(false);
            })
    }
});
   
export default router;
