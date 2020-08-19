import express from 'express';
const router = express.Router();

router.route('/')
    .get(
        (req,res) => {
            // user info 검색
        }
    )

router.route('/change')
    .put(
        (req,res) => {
            // user info 변경

        }
    )


export default router;
