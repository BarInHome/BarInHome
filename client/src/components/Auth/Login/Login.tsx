
import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';

import {AuthState,AuthAction} from '../Auth.reducer';

import usePostRequest from '../../../utils/hooks/usePostRequest';
import useGetRequest from '../../../utils/hooks/useGetRequest';

import history from '../.././../history';


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
    justifyContent: "space-between"
  }
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

          <Grid container className={classes.buttonWrapper} >
        
              <Button
              type="submit"
              className={classes.submitAPI}
              variant="contained" 
              color="primary"
              href="http://localhost:5000/auth/login/facebook" 
              >
              Facebook
              </Button>
  
              <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClickLogin}
              className={classes.submitAPI}
            >
              Google
            </Button>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
