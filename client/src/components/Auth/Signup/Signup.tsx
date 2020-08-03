import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {AuthState,AuthAction} from '../Auth.reducer';

import useInputChange from '../../../utils/hooks/useInputChange';
import usePostRequest from '../../../utils/hooks/usePostRequest';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 
}));

interface userInterface{
  name:string;
  id:string;
  pw:string;
}

interface AuthInterface{
  handleSetIsLogin: (pageNum: boolean) => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function Signup(props:AuthInterface) {
  const {
    handleSetIsLogin, state, dispatch
  } = props;
  const classes = useStyles(); 
  const {id,pw,name} = state;

  const handleChange = (name:any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: name , value: event.target.value});
  }

  const {doPostRequest} = usePostRequest<userInterface,boolean>('/auth/signup',()=>{
      console.log('[signup success]');
      handleSetIsLogin(true);
      window.location.reload();
  });

  const onClickSignup = () => {
      try{
          doPostRequest({
            name:name,
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
          Sign up
        </Typography>
        <br/>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="lname"
                value={name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={id}
                onChange={handleChange('id')}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={pw}
                onChange={handleChange('pw')}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickSignup}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" onClick={()=>handleSetIsLogin(true)}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}