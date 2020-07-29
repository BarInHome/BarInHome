import express, { Request, Response, NextFunction} from 'express' // 1
//import { signup } from './signup';
//import { login } from './login';

const router = express.Router();

/*
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  login(req);
  res.send("login");
});
*/
/*
router.get("/signup", (req: Request, res: Response, next: NextFunction) => {
  signup();  
  req.send("signup");
});
*/
export = router;