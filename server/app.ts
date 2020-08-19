import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path'
import createError from 'http-errors';
import session from 'express-session';
import passport from 'passport';
//import passportConfig from './passport/passport';
import mainloginRouter from './routes/users/login';
import cocktailRouter from './routes/cocktail/cocktail';
import refrigeratorRouter from './routes/refrigerator/index';
import authRouter from './routes/users/index';
import dataRouter from './routes/data/cocktail';

import mypageRouter from './routes/mypage/index';

class ServerApi{
  public app : express.Express

  constructor(){
    this.app = express();
    this.initializeAppSettings();
    this.initializeRouters();
  }

  private initializeAppSettings():void{
    
    this.app.use(session({
      secret:"beobwoo",
      resave:false,
      saveUninitialized: false,
      cookie:{
        
      }
    }));
    /*
    const whiteList = [
      'http://localhost:3000',
     ];
    const corsOptions = {
       origin: whiteList,
       credentials: true
    };
    this.app.use(cors(corsOptions));
    */

   
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended : false}));
    
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));

    

    this.app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
    this.app.use(passport.initialize()); // passport 구동
    this.app.use(passport.session()); // 세션 연결
  }

  private initializeRouters():void{ 
    this.app.use('/main', cocktailRouter);
    this.app.use('/refrigerator', refrigeratorRouter);
    this.app.use('/', mainloginRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/data', dataRouter);
    this.app.use('/mypage',mypageRouter);

    this.app.use(function(req, res, next) {
      next(createError(404));
    });

    interface Err{
      status?: number;
      stack?: string;
      message?: string; 
    }
    
    this.app.use((
      err: Err, req: express.Request, res: express.Response, next: express.NextFunction
    ) => {
      
      const serverErrorMessage = 'Internal Server Error';
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      if (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err.stack);
        }
      
        res.status(err.status || 500);
        res.send({
          code: err.status,
          message: err.message || serverErrorMessage
        });
      }
    });
  }
}

module.exports = ServerApi;
