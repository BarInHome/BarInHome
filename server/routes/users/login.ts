import express from 'express';
import passport from '../../middleware/passport/passport';
const router = express.Router();

/*
  passport - local , DB 연결 완료
*/
router.route('/')
    .post(
        passport.authenticate('local-login',{
        }),(req,res)=>{
          console.log('[Login Success]');
          res.sendStatus(200);
        });

router.route('/check')
     .get(
         (req,res)=>{
            const sessionInfo = req.user;
            if(sessionInfo!=undefined){
                res.send(true);
              }
              else{
                res.send(false);
              }
         }
     )
/*
  passport - facebook , 현재 테스트 앱 과 연결해놓았기에 바로 인증 수행됨
*/
router.route('/facebook')
      .get(
        passport.authenticate('facebook',{
          scope: ['public_profile', 'email']
        },()=>{
          console.log('/facebook excute');
        })
      )
router.route('/facebook/callback')
      .get(
        passport.authenticate('facebook'),
        (req,res) => {
          console.log("[Facebook Login Success]",req.user);
          res.redirect('http://localhost:3000/main');
        }
      );


/*
  passport - google , 현재 테스트 앱 과 연결해놓았기에 바로 인증 수행됨
*/
router.route('/google')
      .get(
        passport.authenticate('google',{
          scope: ['profile', 'email']
        },()=>{
          console.log('/google excute');
        })
      )
router.route('/google/callback')
      .get(
        passport.authenticate('google'),
        (req,res) => {
          console.log("[Google Login Success]",req.user);
          res.redirect('http://localhost:3000/main');
        }
      );

/*
  passport - naver , 현재 테스트 앱 과 연결해놓았기에 바로 인증 수행됨
*/
router.route('/naver')
      .get(
        passport.authenticate('naver',{
          
        },()=>{
          console.log('/naver excute');
        })
      )
router.route('/naver/callback')
      .get(
        passport.authenticate('naver'),
        (req,res) => {
          console.log("[Naver Login Success]",req.user);
          res.redirect('http://localhost:3000/main');
        }
      );

/*
  passport - kakao , 현재 테스트 앱 과 연결해놓았기에 바로 인증 수행됨
*/
      router.route('/kakao')
      .get(
        passport.authenticate('kakao',{
         
        },()=>{
          console.log('/kakao excute');
        })
      )
router.route('/kakao/callback')
      .get(
        passport.authenticate('kakao'),
        (req,res) => {
          console.log("[Kakao Login Success]",req.user);
          res.redirect('http://localhost:3000/main');
        }
      );



export default router;
