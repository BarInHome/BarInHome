import express from 'express';
import doQuery from '../../../database/doQuery';
import response from '../../../middleware/responseHelper/helper';
const router = express.Router();

router.route('/')
    .get(
        (req,res) => {
            // user info 검색
            console.log('req.user:',req.user);
            const sql_userInfo = `
                SELECT * FROM userinfo WHERE id = ?
            `;
            doQuery(sql_userInfo,[req.user])
                .then((data) => {
                    if(data.result[0]){
                        console.log('success');
                        response.Helper.ok(req,res,data.result[0]);
                    }
                })
                .catch((err) => {
                    response.Helper.mysqlError(req,res,err);
                })
        }
    )

router.route('/change')
    .put(
        (req,res) => {
            // user info 변경

        }
    )


export default router;
