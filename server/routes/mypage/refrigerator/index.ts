import express from 'express';
import ingredientList from '../../../data/ingredient.json';
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
    strIngredient : string|null;
    strType : string|null;
    strAlcohol : string|null;
}

router.route('/search')
    .post(
        (req,res) => {
            const {strIngredient , strType , strAlcohol} = req.body;
            const target = req.body;

            /*
                필터링 알고리즘
                3 개 인수는 null 을 허용하며 null 이 아닌 인수들과 일치하는 교집합을
                ingredientData 에서 전부 추출하여 OA 로 리턴한다.
            */
        }
    )



export default router;
