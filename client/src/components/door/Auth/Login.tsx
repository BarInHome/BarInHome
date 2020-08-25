
import React from 'react';
import {Icon} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {Facebook,Public,Email, ContactSupport} from '@material-ui/icons';
import googleLogo from '../../../../public/images/google_icon.png';
import { makeStyles } from '@material-ui/core/styles';
import {AuthState,AuthAction} from './Auth.reducer';

import usePostRequest from '../../../utils/hooks/usePostRequest';
import useGetRequest from '../../../utils/hooks/useGetRequest';

import history from '../.././../history';


/*
  1) Facebook : id, name            + email
  2) Google   : id, name, email     
  3) Naver    : id, email           + name
  4) Kakao    : id                  + id , email
*/

/*
  id : string
  pw : string
  name : string
  email : string
  kind : string (1,2,3,4,5)
*/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: 'parent', // Fix IE 11 issue.
    height:'parent',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitAPI: {
    margin: theme.spacing(3, 0, 2),
    width: "45%",
  },
  buttonWrapper: {
    justifyContent: "space-between",
  },
  facebook: {
    background: "#4267b2",
    borderRadius: "5px",
    color: "white",
    margin: theme.spacing(3, 0, 2),
    width: "45%",
    justifyContent: "space-around",
  },
  google: {
    background: "#FFFFFF",
    borderRadius: "5px",
    color: "black",
    margin: theme.spacing(3, 0, 2),
    width: "45%",
    justifyContent: "space-around",
  },
  naver: {
    background: "#37b24d",
    borderRadius: "5px",
    color: "white",
    margin: theme.spacing(3, 0, 2),
    width: "45%",
    justifyContent: "space-around",
  },
  kakao: {
    background: "#fcc419",
    borderRadius: "5px",
    color: "white",
    margin: theme.spacing(3, 0, 2),
    width: "45%",
    justifyContent: "space-around",
  },
}));

interface userInterface{
  name?:string;
  id:string;
  pw:string;
}
interface userSessionInterface{
  handleLoginInfo: (state: boolean) => void;
}
interface AuthInterface{
  handleSetIsLogin: (pageNum: boolean) => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function Login(props:AuthInterface):JSX.Element {
  const {
    handleSetIsLogin, state, dispatch
  } = props;
  const classes = useStyles();
  const {id,pw} = state;

  const handleChange = (name:any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: name , value: event.target.value});
  }

  const {doPostRequest} = usePostRequest<userInterface,boolean>('/auth/login',()=>{
      console.log('[login success]');
      handleSetIsLogin(true);
      history.push('/main');
      window.location.reload();
  });

  const onClickLogin = () => {
      try{
          doPostRequest({
            id:id,
            pw:pw
          });
      }catch(e){
          console.log(e);
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate></form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={id}
            onChange={handleChange('id')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password" 
            value={pw}
            onChange={handleChange('pw')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickLogin}
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={()=>handleSetIsLogin(false)}>
                 Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>

          <Grid container className={classes.buttonWrapper}>
        
              <Button
              type="submit"
              className={classes.facebook}
              variant="contained" 
              color="primary"
              href="http://localhost:5000/auth/login/facebook"
              startIcon={<Facebook></Facebook>} 
              >
              Facebook
              </Button>
  
              <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClickLogin}
              className={classes.google}
              href="http://localhost:5000/auth/login/google"
              startIcon={<Public></Public>} 
            >
              Google
            </Button>
          </Grid>
          <Grid container className={classes.buttonWrapper} >
        
              <Button
              type="submit"
              className={classes.naver}
              variant="contained" 
              color="primary"
              href="http://localhost:5000/auth/login/naver"
              startIcon={<Email/>} 
              >
              Naver
              </Button>
  
              <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClickLogin}
              className={classes.kakao}
              href="http://localhost:5000/auth/login/kakao"
              startIcon={<ContactSupport/>} 
            >
              KaKao
            </Button>
          </Grid>
          <Grid container xs={12} className={classes.buttonWrapper} >
            <Grid item xs={12}>
              <Button
                type="submit"
                
                variant="contained" 
                color="secondary"
                href="http://localhost:5000/auth/login/admin"
                startIcon={<Email/>} 
                >
                관리자 계정 로그인
                </Button>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
