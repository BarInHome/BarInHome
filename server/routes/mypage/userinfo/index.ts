import express from 'express';
import doQuery from '../../../database/doQuery';
const router = express.Router();

router.route('/')
    .get(
        (req,res) => {
            // user info 검색
            const sql_userInfo = `
                SELECT * FROM userinfo WHERE id = ?
            `;
            doQuery(sql_userInfo,[req.user])
                .then((data) => {
                    if(data.result[0]){
                        console.log('success');
                        res.send(data.result[0]);
                    }
                })
                .catch((err) => {
                    res.status(401).send(null);
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
